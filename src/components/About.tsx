'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faUniversity, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const education = [
    {
        degree: 'M.Sc. Artificial Intelligence',
        school: 'Friedrich-Alexander-Universität Erlangen–Nürnberg',
        period: '03/2024 – Present',
        icon: faUniversity,
    },
    {
        degree: 'B.Tech. Computer Science & Engineering',
        school: 'National Institute of Technology, Meghalaya',
        period: '04/2018 – 04/2022',
        icon: faUserGraduate,
    },
];

const stats = [
    { number: '5+', label: 'Projects Completed' },
    { number: '3+', label: 'Years Experience' },
    { number: '10+', label: 'Technologies' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
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

export default function About() {
    return (
        <section id="about" className="about">
            <div className="container">
                <motion.div
                    className="sectionHeader"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="sectionTitle">About Me</h2>
                    <p className="sectionSubtitle">
                        Passionate about building intelligent systems and pushing the boundaries of AI
                    </p>
                </motion.div>

                <div className="aboutGrid">
                    <motion.div
                        className="aboutImage"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="aboutImagePlaceholder">
                            <FontAwesomeIcon icon={faUserGraduate} />
                        </div>
                    </motion.div>

                    <motion.div
                        className="aboutContent"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div className="aboutText" variants={itemVariants}>
                            <motion.p variants={itemVariants}>
                                I&apos;m an AI/ML Engineer specializing in <strong>LLM orchestration</strong> and
                                <strong> RAG architectures</strong>. Currently pursuing my Master&apos;s in
                                Artificial Intelligence at FAU Erlangen-Nürnberg, I build intelligent systems
                                that leverage cutting-edge AI technologies.
                            </motion.p>
                            <motion.p variants={itemVariants}>
                                My expertise spans <strong>multi-agent workflows</strong>, <strong>vector databases</strong>,
                                and deploying AI solutions at scale. I&apos;m passionate about building tools that
                                enhance developer productivity and automate complex workflows.
                            </motion.p>
                        </motion.div>

                        <motion.div className="aboutStats" variants={itemVariants}>
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    className="statItem"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="statNumber">{stat.number}</div>
                                    <div className="statLabel">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div className="educationList" variants={itemVariants}>
                            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                                Education
                            </h3>
                            {education.map((edu, index) => (
                                <motion.div
                                    key={edu.degree}
                                    className="educationItem"
                                    variants={itemVariants}
                                    whileHover={{ x: 10 }}
                                >
                                    <motion.div
                                        style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}
                                    >
                                        <motion.div
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                background: 'var(--accent-light)',
                                                borderRadius: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'var(--accent)',
                                            }}
                                        >
                                            <FontAwesomeIcon icon={edu.icon} />
                                        </motion.div>
                                        <h4>{edu.degree}</h4>
                                    </motion.div>
                                    <p style={{ marginLeft: '3.5rem' }}>
                                        {edu.school}
                                    </p>
                                    <p style={{ marginLeft: '3.5rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <FontAwesomeIcon icon={faCalendarAlt} style={{ fontSize: '0.8rem' }} />
                                        {edu.period}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
