import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Send, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { FAQS, SERVICES, waLink } from "@/data/content";
import Reveal from "@/components/Reveal";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const inputCls =
    "w-full h-12 rounded-xl border border-slate-300 bg-white px-4 text-navy placeholder:text-slateblue/50 outline-none transition-all focus:border-turquoise focus:ring-2 focus:ring-turquoise/25";

export const FaqContact = ({ preselectedService }) => {
    const { t } = useLanguage();
    const faqItems = t("faq.items");
    const [openFaq, setOpenFaq] = useState(0);
    const [form, setForm] = useState({
        nom: "",
        email: "",
        telefon: "",
        servei: "",
        urgencia: "2_setmanes",
        missatge: "",
    });
    const [sending, setSending] = useState(false);

    useEffect(() => {
        if (preselectedService) {
            setForm((f) => ({ ...f, servei: preselectedService }));
        }
    }, [preselectedService]);

    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        if (sending) return;
        setSending(true);
        try {
            const res = await axios.post(`${API}/contacte`, {
                nom: form.nom,
                email: form.email,
                telefon: form.telefon,
                servei: form.servei || "altre",
                missatge: form.missatge,
                urgencia: form.urgencia,
            });
            toast.success(
                res.data?.message ||
                    t("contact.response"),
            );
            setForm({
                nom: "",
                email: "",
                telefon: "",
                servei: "",
                urgencia: "2_setmanes",
                missatge: "",
            });
        } catch (err) {
            toast.error(
                err?.response?.status === 422
                    ? `${t("contact.name")} ${t("contact.email")} ${t("contact.message")}`
                    : "No s'ha pogut enviar. Prova de nou o escriu-nos per WhatsApp.",
            );
        } finally {
            setSending(false);
        }
    };

    return (
        <section
            id="faq"
            data-testid="faq-contact-section"
            className="bg-azure/40 py-24 lg:py-32"
        >
            <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
                <div>
                    <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-turquoise-dark">
                        {t("contact.faqEyebrow")}
                    </p>
                    <h2 className="mt-4 font-display font-bold tracking-tight text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.06] text-navy">
                        {t("contact.faqTitle")}
                    </h2>
                    <div
                        data-testid="faq-accordion"
                        className="mt-10 border-t border-slate-200"
                    >
                        {faqItems.map(([question, answer], i) => (
                            <div key={question} className="border-b border-slate-200">
                                <button
                                    data-testid={`faq-item-button-${i}`}
                                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                                    className="w-full flex justify-between items-center py-5 text-left gap-4"
                                >
                                    <span className="font-display font-semibold text-navy text-lg">
                                        {question}
                                    </span>
                                    <Plus
                                        size={19}
                                        className={cn(
                                            "shrink-0 text-turquoise-dark transition-transform duration-300",
                                            openFaq === i && "rotate-45",
                                        )}
                                    />
                                </button>
                                <AnimatePresence initial={false}>
                                    {openFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                            className="overflow-hidden"
                                        >
                                            <p className="pb-5 text-slateblue leading-relaxed">
                                                {answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                <div id="contacte" className="scroll-mt-24">
                    <Reveal>
                        <form
                            data-testid="contact-form"
                            onSubmit={submit}
                            className="rounded-2xl bg-white border border-slate-200 shadow-soft p-6 sm:p-9"
                        >
                            <h3 className="font-display font-bold text-2xl tracking-tight text-navy">
                                {t("contact.formTitle")}
                            </h3>
                            <p className="mt-1.5 text-sm text-slateblue">
                                {t("contact.response")}
                            </p>

                            <div className="mt-7 grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="cf-nom" className="block text-sm font-medium text-navy mb-1.5">
                                        {t("contact.name")}
                                    </label>
                                    <input
                                        id="cf-nom"
                                        data-testid="contact-input-name"
                                        required
                                        minLength={2}
                                        value={form.nom}
                                        onChange={set("nom")}
                                        placeholder="Maria Puig"
                                        className={inputCls}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="cf-email" className="block text-sm font-medium text-navy mb-1.5">
                                        {t("contact.email")}
                                    </label>
                                    <input
                                        id="cf-email"
                                        data-testid="contact-input-email"
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={set("email")}
                                        placeholder="maria@elmeunegoci.cat"
                                        className={inputCls}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="cf-tel" className="block text-sm font-medium text-navy mb-1.5">
                                        {t("contact.phone")}
                                    </label>
                                    <input
                                        id="cf-tel"
                                        data-testid="contact-input-phone"
                                        type="tel"
                                        value={form.telefon}
                                        onChange={set("telefon")}
                                        placeholder="+34 600 000 000"
                                        className={inputCls}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="cf-servei" className="block text-sm font-medium text-navy mb-1.5">
                                        {t("contact.service")}
                                    </label>
                                    <select
                                        id="cf-servei"
                                        data-testid="contact-select-service"
                                        value={form.servei}
                                        onChange={set("servei")}
                                        className={cn(inputCls, "appearance-none bg-white")}
                                    >
                                        <option value="">{t("contact.unknown")}</option>
                                        {SERVICES.map((s) => (
                                            <option key={s.id} value={s.id}>
                                                {s.name}
                                            </option>
                                        ))}
                                        <option value="altre">{t("contact.other")}</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-4">
                                <span className="block text-sm font-medium text-navy mb-2">
                                    {t("contact.urgency")}
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        ["immediata", t("contact.soon")],
                                        ["2_setmanes", t("contact.weeks")],
                                        ["planificant", t("contact.planning")],
                                    ].map(([val, label]) => (
                                        <button
                                            key={val}
                                            type="button"
                                            data-testid={`contact-urgency-${val}`}
                                            onClick={() => setForm((f) => ({ ...f, urgencia: val }))}
                                            className={cn(
                                                "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                                                form.urgencia === val
                                                    ? "border-turquoise bg-turquoise-tint text-turquoise-dark"
                                                    : "border-slate-300 text-slateblue hover:border-turquoise",
                                            )}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-4">
                                <label htmlFor="cf-msg" className="block text-sm font-medium text-navy mb-1.5">
                                    {t("contact.message")}
                                </label>
                                <textarea
                                    id="cf-msg"
                                    data-testid="contact-textarea-message"
                                    required
                                    minLength={5}
                                    rows={4}
                                    value={form.missatge}
                                    onChange={set("missatge")}
                                    placeholder="Tinc una fusteria a Vic i vull que em trobin a Google…"
                                    className={cn(inputCls, "h-auto py-3 resize-none")}
                                />
                            </div>

                            <button
                                type="submit"
                                data-testid="contact-submit-button"
                                disabled={sending}
                                className="mt-6 w-full h-14 rounded-xl bg-turquoise text-navy font-semibold text-lg flex items-center justify-center gap-2.5 hover:bg-turquoise-light active:scale-[0.99] transition-all disabled:opacity-70"
                            >
                                {sending ? (
                                    <>
                                        <Loader2 size={19} className="animate-spin" />
                                        {t("contact.sending")}
                                    </>
                                ) : (
                                    <>
                                        {t("contact.submit")}
                                        <Send size={18} />
                                    </>
                                )}
                            </button>

                            <div className="mt-6 flex items-center gap-4">
                                <span className="h-px flex-1 bg-slate-200" />
                                <span className="text-xs font-mono uppercase tracking-widest text-slateblue/60">
                                    {t("contact.or")}
                                </span>
                                <span className="h-px flex-1 bg-slate-200" />
                            </div>

                            <a
                                data-testid="contact-whatsapp-direct-button"
                                href={waLink(
                                    "Hola Webilo! Vull pressupost per a una web.",
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-5 w-full h-14 rounded-xl bg-wa text-white font-semibold flex items-center justify-center gap-2.5 hover:brightness-110 active:scale-[0.99] transition-all"
                            >
                                <WhatsAppIcon size={19} />
                                {t("contact.whatsapp")}
                            </a>
                            <p className="mt-3 text-center text-xs text-slateblue/70 font-mono">
                                [s'ha d'afegir] número provisional — contestem en horari laborable
                            </p>
                        </form>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default FaqContact;
