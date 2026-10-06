from fastapi import FastAPI, APIRouter, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List
import uuid
import smtplib
from email.message import EmailMessage
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactCreate(BaseModel):
    nom: str = Field(min_length=2, max_length=120)
    email: EmailStr
    telefon: str = Field(default="", max_length=40)
    servei: str = Field(default="altre", max_length=40)
    missatge: str = Field(min_length=5, max_length=3000)
    urgencia: str = Field(default="planificant", max_length=40)


@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/contacte")
async def create_contacte(input: ContactCreate, background_tasks: BackgroundTasks):
    doc = {**input.model_dump(), "created_at": datetime.now(timezone.utc).isoformat()}
    result = await db.contact_requests.insert_one(doc)
    background_tasks.add_task(send_contact_email, doc)
    return {
        "success": True,
        "id": str(result.inserted_id),
        "message": "Missatge rebut correctament! Ens posarem en contacte en menys de 24 hores.",
    }


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def send_contact_email(doc):
    smtp_host = os.environ.get("SMTP_HOST")
    smtp_user = os.environ.get("SMTP_USER")
    smtp_password = os.environ.get("SMTP_PASSWORD")
    contact_email = os.environ.get("CONTACT_EMAIL", "hola@webilo.cat")
    if not all((smtp_host, smtp_user, smtp_password)):
        logger.warning("Contact saved but email delivery is not configured")
        return

    message = EmailMessage()
    message["Subject"] = f"Nova consulta Webilo: {doc['nom']}"
    message["From"] = os.environ.get("SMTP_FROM", smtp_user)
    message["To"] = contact_email
    message["Reply-To"] = doc["email"]
    message.set_content(
        "Nova consulta rebuda des de la web Webilo\n\n"
        f"Nom: {doc['nom']}\n"
        f"Email: {doc['email']}\n"
        f"Telefon: {doc['telefon'] or 'No indicat'}\n"
        f"Servei: {doc['servei']}\n"
        f"Urgencia: {doc['urgencia']}\n\n"
        f"Missatge:\n{doc['missatge']}\n"
    )

    try:
        with smtplib.SMTP(smtp_host, int(os.environ.get("SMTP_PORT", "587")), timeout=15) as smtp:
            smtp.starttls()
            smtp.login(smtp_user, smtp_password)
            smtp.send_message(message)
        logger.info("Contact email sent to %s", contact_email)
    except Exception:
        logger.exception("Contact saved but email delivery failed")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
