"use client";

import { motion } from "framer-motion";

/**
 * AnimatedPage — Wraps page content with a smooth fade-in + slide-up.
 *
 * Used as the outermost container on every page to give
 * consistent entrance animations across the application.
 */

type AnimatedPageProps = {
  children: React.ReactNode;
  className?: string;
};

const pageVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      staggerChildren: 0.06,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export default function AnimatedPage({
  children,
  className = "",
}: AnimatedPageProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * AnimatedItem — Individual child element that participates
 * in the staggered entrance animation.
 */
export function AnimatedItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
