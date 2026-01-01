'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps {
    children: ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    className?: string;
}

export function FadeIn({
    children,
    delay = 0,
    direction = 'up',
    className = '',
}: FadeInProps) {
    const directions = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 },
    };

    return (
        <motion.div
            className={className}
            initial={{
                opacity: 0,
                ...directions[direction],
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                x: 0,
            }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.25, 0.25, 0, 1] as const,
            }}
        >
            {children}
        </motion.div>
    );
}

interface StaggerProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export function Stagger({ children, delay = 0, className = '' }: StaggerProps) {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1, delayChildren: delay }}
        >
            {children}
        </motion.div>
    );
}

export const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.25, 0, 1] as const },
    },
};

interface ScaleOnHoverProps {
    children: ReactNode;
    className?: string;
}

export function ScaleOnHover({ children, className = '' }: ScaleOnHoverProps) {
    return (
        <motion.div
            className={className}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
        >
            {children}
        </motion.div>
    );
}

interface FloatProps {
    children: ReactNode;
    className?: string;
}

export function Float({ children, className = '' }: FloatProps) {
    return (
        <motion.div
            className={className}
            animate={{
                y: [0, -15, 0],
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
        >
            {children}
        </motion.div>
    );
}
