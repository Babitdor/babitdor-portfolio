'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faSquareGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';

const contactMethods = [
    {
        icon: faEnvelope,
        label: 'Email',
        value: 'babitdorbryan14@gmail.com',
        href: 'mailto:babitdorbryan14@gmail.com',
    },
    {
        icon: faPhone,
        label: 'Phone',
        value: '+49 176 37280448',
        href: 'tel:+4917637280448',
    },
    {
        icon: faLinkedin,
        label: 'LinkedIn',
        value: 'Connect with me',
        href: 'https://www.linkedin.com/in/babitdor-kayang-khonglah-aa1b68207/',
    },
    {
        icon: faSquareGithub,
        label: 'GitHub',
        value: 'View my code',
        href: 'https://github.com/Babitdor',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: [0.25, 0.25, 0, 1] as const },
    },
};

export default function Contact() {
    return (
        <section id="contact" className="contact">
            <div className="container">
                <motion.div
                    className="sectionHeader"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="sectionTitle">Get In Touch</h2>
                    <p className="sectionSubtitle">
                        I&apos;m always open to discussing new opportunities, research collaborations,
                        or interesting AI/ML projects.
                    </p>
                </motion.div>

                <motion.div
                    className="contactContent"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <motion.div
                        className="contactGrid"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {contactMethods.map((method, index) => (
                            <motion.a
                                key={method.label}
                                href={method.href}
                                className="contactCard"
                                target="_blank"
                                rel="noopener noreferrer"
                                variants={itemVariants}
                                whileHover={{
                                    scale: 1.05,
                                    y: -5,
                                }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                            >
                                <motion.div
                                    className="contactIcon"
                                    animate={{
                                        rotate: [0, 5, -5, 0],
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                >
                                    <FontAwesomeIcon icon={method.icon} />
                                </motion.div>
                                <h4>{method.label}</h4>
                                <p>{method.value}</p>
                            </motion.a>
                        ))}
                    </motion.div>

                    <motion.div
                        className="contactCTA"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <motion.a
                            href="mailto:babitdorbryan14@gmail.com"
                            className="btnPrimary"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <FontAwesomeIcon icon={faPaperPlane} />
                            Send Me an Email
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
