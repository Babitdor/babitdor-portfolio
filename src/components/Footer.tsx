'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

const currentYear = new Date().getFullYear();

const socialLinks = [
    { icon: faGithub, href: 'https://github.com/Babitdor', label: 'GitHub' },
    { icon: faLinkedin, href: 'https://www.linkedin.com/in/babitdor-kayang-khonglah-aa1b68207/', label: 'LinkedIn' },
    { icon: faTwitter, href: 'https://twitter.com', label: 'Twitter' },
];

const emailInfo = {
    email: 'babitdorbryan14@gmail.com',
    href: 'mailto:babitdorbryan14@gmail.com',
};

const footerLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

export default function Footer() {
    return (
        <motion.footer
            className="footer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <div className="footerContent">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <a href="/" className="logo" style={{ fontSize: '1.25rem' }}>
                        Babitdor.
                    </a>
                    <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        AI/ML Engineer | LLM Specialist
                    </p>
                    <a
                        href={emailInfo.href}
                        style={{
                            marginTop: '0.75rem',
                            fontSize: '0.85rem',
                            color: 'var(--text-secondary)',
                            textDecoration: 'none',
                            transition: 'color 0.3s ease',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                    >
                        {emailInfo.email}
                    </a>
                </motion.div>

                <motion.div
                    className="footerLinks"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {footerLinks.map((link, index) => (
                        <motion.div
                            key={link.label}
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                        >
                            <a href={link.href}>{link.label}</a>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="footerSocial"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {socialLinks.map((social, index) => (
                        <motion.a
                            key={social.label}
                            href={social.href}
                            aria-label={social.label}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <FontAwesomeIcon icon={social.icon} />
                        </motion.a>
                    ))}
                </motion.div>
            </div>

            <motion.div
                style={{
                    textAlign: 'center',
                    marginTop: '2rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid var(--border)',
                    maxWidth: '1280px',
                    margin: '2rem auto 0',
                    padding: '1.5rem 2.5rem 0',
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    &copy; {currentYear} Babitdor Kayang Khonglah. All rights reserved.
                </p>
            </motion.div>
        </motion.footer>
    );
}
