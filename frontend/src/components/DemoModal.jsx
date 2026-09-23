import { useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, X } from "lucide-react";
import FusteriaDemo from "@/components/demos/FusteriaDemo";
import DentistaDemo from "@/components/demos/DentistaDemo";
import ModaDemo from "@/components/demos/ModaDemo";

const DEMOS = {
    fusteria: FusteriaDemo,
    dentista: DentistaDemo,
    moda: ModaDemo,
};

export const DemoModal = ({ demoId, demoUrl, onClose }) => {
    const Demo = DEMOS[demoId];

    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose();
        window.__lenis?.stop();
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            window.__lenis?.start();
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [onClose]);

    if (!Demo) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center sm:p-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-ink/85 backdrop-blur-sm"
            />
            <motion.div
                data-testid="demo-fullscreen-modal"
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 28, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-full sm:h-[min(90vh,920px)] sm:w-[min(1200px,94vw)] sm:rounded-2xl overflow-hidden bg-white shadow-2xl flex flex-col"
            >
                <div className="flex items-center gap-2 px-4 h-12 bg-navy shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                    <div
                        data-testid="demo-modal-url-bar"
                        className="flex-1 flex justify-center px-4"
                    >
                        <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-white/75 bg-navy-surface border border-navy-border rounded-md px-3 py-1.5 max-w-full overflow-hidden">
                            <Lock size={11} className="text-turquoise shrink-0" />
                            <span className="truncate">https://{demoUrl}</span>
                        </div>
                    </div>
                    <button
                        data-testid="demo-modal-close-button"
                        onClick={onClose}
                        aria-label="Tancar demo"
                        className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/20 text-white hover:bg-white/10 active:scale-95 transition-all shrink-0"
                    >
                        <X size={17} />
                    </button>
                </div>
                <div
                    data-testid="demo-modal-viewport"
                    className="flex-1 overflow-y-auto overscroll-contain demo-scroll"
                >
                    <Demo />
                </div>
            </motion.div>
        </div>
    );
};

export default DemoModal;
