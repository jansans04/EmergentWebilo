import { motion } from "framer-motion";
import { waLink } from "@/data/content";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export const WhatsAppFab = () => (
    <motion.a
        data-testid="floating-whatsapp-fab"
        href={waLink("Hola Webilo! Vull parlar d'una web.")}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 16, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.4, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-5 right-5 z-[65] lg:hidden flex items-center gap-2 rounded-full bg-wa text-white pl-4 pr-5 py-3.5 shadow-[0_12px_30px_-8px_rgba(37,211,102,0.6)] font-semibold text-sm active:scale-95 transition-transform"
    >
        <WhatsAppIcon size={19} />
        Parlem?
    </motion.a>
);

export default WhatsAppFab;
