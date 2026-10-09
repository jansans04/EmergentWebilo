import { motion, useReducedMotion } from "framer-motion";

export const BrandLogo = ({ animated = false, compact = false, className = "" }) => {
    const reduce = useReducedMotion();
    const imageClass = compact ? "h-7 w-7" : "h-16 w-16 sm:h-20 sm:w-20";
    const textClass = compact ? "text-xl" : "text-4xl sm:text-6xl";

    return (
        <div className={`flex items-center gap-2.5 ${className}`}>
            <motion.div
                initial={animated && !reduce ? { clipPath: "inset(0 100% 0 0)", scale: 0.8 } : false}
                animate={{ clipPath: "inset(0 0% 0 0)", scale: 1 }}
                transition={{ duration: animated ? 0.9 : 0, ease: [0.16, 1, 0.3, 1] }}
                className={`${imageClass} shrink-0 overflow-hidden rounded-full`}
            >
                <img src="/logoWebilo.jpg" alt="" className="h-full w-full object-contain mix-blend-multiply" />
            </motion.div>
            <motion.span
                initial={animated && !reduce ? { opacity: 0, x: 14, filter: "blur(10px)" } : false}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ delay: animated ? 0.72 : 0, duration: animated ? 0.65 : 0, ease: [0.22, 1, 0.36, 1] }}
                className={`font-display font-bold tracking-tight ${textClass}`}
            >
                Webilo
            </motion.span>
        </div>
    );
};

export default BrandLogo;
