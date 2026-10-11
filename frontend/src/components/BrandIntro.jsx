import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const LOGO_IN_DELAY = 0.15;
const LOGO_IN_DUR = 0.8;
const LETTERS_DELAY = 0.65;
const LETTER_STAGGER = 0.07;
const TAGLINE_DELAY = 1.45;
const HOLD_MS = 3000;
const EXIT_DUR = 0.55;

const LETTERS = ["W", "e", "b", "i", "l", "o"];

const letterVariants = {
    hidden: { y: 32, opacity: 0, filter: "blur(8px)" },
    visible: (i) => ({
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: {
            delay: LETTERS_DELAY + i * LETTER_STAGGER,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

const taglineVariants = {
    hidden: { opacity: 0, y: 6 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { delay: TAGLINE_DELAY, duration: 0.6, ease: "easeOut" },
    },
};

export const BrandIntro = ({ onDone }) => {
    const [visible, setVisible] = useState(() => {
        try {
            return !sessionStorage.getItem("webilo_intro_seen");
        } catch {
            return true;
        }
    });
    const reduce = useReducedMotion();

    useEffect(() => {
        if (!visible) {
            onDone?.();
            return;
        }
        const timeout = setTimeout(() => {
            setVisible(false);
            try {
                sessionStorage.setItem("webilo_intro_seen", "1");
            } catch {
                // Storage can be unavailable in private browsing contexts.
            }
        }, reduce ? 600 : HOLD_MS);
        return () => clearTimeout(timeout);
    }, [visible, reduce, onDone]);

    useEffect(() => {
        if (!visible) return undefined;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [visible]);

    return (
        <AnimatePresence onExitComplete={onDone}>
            {visible && (
                <motion.div
                    key="brand-intro"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: EXIT_DUR, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[120] flex flex-col items-center justify-center overflow-hidden bg-white select-none"
                    aria-hidden="true"
                >
                    <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                        className="pointer-events-none absolute h-[520px] w-[520px] rounded-full bg-turquoise/5 blur-3xl"
                    />

                    <div className="relative flex flex-col items-center gap-5">
                        <motion.div
                            initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.82, filter: "blur(12px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            transition={{ delay: LOGO_IN_DELAY, duration: LOGO_IN_DUR, ease: [0.16, 1, 0.3, 1] }}
                            className="h-20 w-20 overflow-hidden rounded-2xl shadow-lift sm:h-28 sm:w-28"
                        >
                            <img src="/logoWebilo.jpg" alt="Webilo" className="h-full w-full object-contain mix-blend-multiply" />
                        </motion.div>

                        <div className="flex items-baseline gap-[0.04em] overflow-hidden">
                            {LETTERS.map((letter, i) => (
                                <motion.span
                                    key={letter + i}
                                    custom={i}
                                    variants={reduce ? {} : letterVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="font-display text-5xl font-bold leading-none tracking-tight text-ink sm:text-7xl"
                                    style={{ display: "inline-block" }}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </div>

                        <motion.p
                            variants={reduce ? {} : taglineVariants}
                            initial="hidden"
                            animate="visible"
                            className="font-mono text-[11px] uppercase tracking-[0.28em] text-slateblue sm:text-xs"
                        >
                            Webs que fan feina
                        </motion.p>

                        {!reduce && (
                            <motion.div
                                className="absolute -bottom-10 left-0 h-[2px] rounded-full bg-turquoise/40"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ delay: LETTERS_DELAY, duration: HOLD_MS / 1000 - LETTERS_DELAY - 0.3, ease: "linear" }}
                            />
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BrandIntro;
