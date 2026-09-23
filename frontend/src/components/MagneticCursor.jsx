import { useEffect, useState } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useReducedMotion,
} from "framer-motion";

export const MagneticCursor = () => {
    const [enabled] = useState(
        () =>
            typeof window !== "undefined" &&
            window.matchMedia("(pointer: fine)").matches &&
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
    const [hovering, setHovering] = useState(false);
    const [visible, setVisible] = useState(false);
    const mx = useMotionValue(-100);
    const my = useMotionValue(-100);
    const sx = useSpring(mx, { stiffness: 400, damping: 35, mass: 0.5 });
    const sy = useSpring(my, { stiffness: 400, damping: 35, mass: 0.5 });
    const reduce = useReducedMotion();

    useEffect(() => {
        if (!enabled || reduce) return;
        const move = (e) => {
            mx.set(e.clientX);
            my.set(e.clientY);
            setVisible(true);
        };
        const leave = () => setVisible(false);
        const over = (e) => {
            setHovering(
                !!e.target.closest?.(
                    "a,button,[role='button'],input,select,textarea,label,summary",
                ),
            );
        };
        window.addEventListener("mousemove", move, { passive: true });
        document.documentElement.addEventListener("mouseleave", leave);
        window.addEventListener("mouseover", over, { passive: true });
        return () => {
            window.removeEventListener("mousemove", move);
            document.documentElement.removeEventListener("mouseleave", leave);
            window.removeEventListener("mouseover", over);
        };
    }, [enabled, reduce, mx, my]);

    if (!enabled || reduce) return null;

    return (
        <motion.div
            data-testid="custom-magnetic-cursor"
            style={{ x: sx, y: sy }}
            className="fixed top-0 left-0 z-[300] pointer-events-none hidden md:block"
        >
            <motion.div
                animate={{
                    scale: hovering ? 3.2 : 1,
                    opacity: visible ? 1 : 0,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="rounded-full bg-white mix-blend-difference -translate-x-1/2 -translate-y-1/2"
                style={{ width: 10, height: 10 }}
            />
        </motion.div>
    );
};

export default MagneticCursor;
