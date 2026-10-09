import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export const BrandIntro = () => {
    const [visible, setVisible] = useState(true);
    const reduce = useReducedMotion();

    useEffect(() => {
        const timeout = window.setTimeout(() => setVisible(false), reduce ? 900 : 2500);
        return () => window.clearTimeout(timeout);
    }, [reduce]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    data-testid="brand-intro"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-[#fbfcfc]"
                >
                    <div className="relative flex items-center gap-3 px-8 sm:gap-6">
                        <motion.div
                            initial={reduce ? { opacity: 1 } : { clipPath: "inset(0 100% 0 0)", scale: 0.9 }}
                            animate={{ clipPath: "inset(0 0% 0 0)", scale: 1 }}
                            transition={{ duration: reduce ? 0 : 1.15, ease: [0.16, 1, 0.3, 1] }}
                            className="relative h-28 w-28 shrink-0 overflow-visible sm:h-40 sm:w-40"
                        >
                            <img src="/logoWebilo.jpg" alt="Webilo" className="h-full w-full object-contain mix-blend-multiply" />
                            <motion.span
                                aria-hidden
                                initial={{ opacity: 0, scale: 0.4, y: 12 }}
                                animate={{ opacity: [0, 1, 0], scale: [0.4, 1.2, 1.6], y: [12, -2, -18] }}
                                transition={{ delay: 1.05, duration: 0.55, ease: "easeOut" }}
                                className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-turquoise/20 text-turquoise-dark blur-[0.2px]"
                            >
                                <ArrowUpRight size={25} />
                            </motion.span>
                        </motion.div>
                        <motion.div
                            initial={reduce ? { opacity: 1, filter: "blur(0px)", x: 0 } : { opacity: 0, filter: "blur(14px)", x: 18 }}
                            animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                            transition={{ delay: 1.35, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <p className="font-display text-4xl font-bold tracking-tight text-navy sm:text-6xl">Webilo</p>
                            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em] text-slateblue sm:text-xs">Webs que fan feina</p>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BrandIntro;
