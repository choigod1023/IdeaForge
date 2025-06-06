import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const FadeInUp = ({
  children,
  className = "",
  delay = 0,
}: FadeInUpProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);
