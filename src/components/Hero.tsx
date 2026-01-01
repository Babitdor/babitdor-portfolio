'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faMapMarkerAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Model3D from './Model3D';
import Link from 'next/link';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.25, 0, 1] as const },
    },
};

const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { type: 'spring' as const, stiffness: 200, damping: 15 },
    },
};

export default function Hero() {
    return (
        <section id="home" className="hero">
            <div className="container">
                <motion.div
                    className="heroContent"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div className="heroBadge" variants={itemVariants}>
                        <span>Available for work</span>
                    </motion.div>

                    <motion.h1 variants={itemVariants}>
                        Hi, I&apos;m{' '}
                        <motion.span
                            className="gradient-text"
                            style={{ display: 'inline-block' }}
                        >
                            Babitdor Kayang Khonglah
                        </motion.span>
                    </motion.h1>

                    <motion.p className="heroSubtitle" variants={itemVariants}>
                        AI/ML Engineer specializing in LLM orchestration, RAG architectures,
                        and building intelligent systems that scale.
                    </motion.p>

                    <motion.div className="heroLocation" variants={itemVariants}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                        <span>Erlangen, Germany</span>
                    </motion.div>

                    <motion.div className="heroButtons" variants={itemVariants}>
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                            <Link href="#projects" className="btnPrimary">
                                View Projects
                                <FontAwesomeIcon icon={faArrowRight} />
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                            <Link href="#contact" className="btnSecondary">
                                Get In Touch
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div className="socialLinks" variants={itemVariants}>
                        {[
                            { icon: faGithub, href: 'https://github.com/Babitdor', label: 'GitHub' },
                            { icon: faLinkedin, href: 'https://www.linkedin.com/in/babitdor-kayang-khonglah-aa1b68207/', label: 'LinkedIn' },
                            { icon: faEnvelope, href: 'mailto:babitdorbryan14@gmail.com', label: 'Email' },
                        ].map((social, i) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                className="socialIcon"
                                aria-label={social.label}
                                target="_blank"
                                rel="noopener noreferrer"
                                variants={iconVariants}
                                whileHover={{ scale: 1.15, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ delay: 0.6 + i * 0.1 }}
                            >
                                <FontAwesomeIcon icon={social.icon} size="lg" />
                            </motion.a>
                        ))}
                    </motion.div>

                </motion.div>

                <div className="hero3DBackground">
                    <Model3D />
                </div>
            </div>
        </section>
    );
}
