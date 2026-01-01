'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPython,
    faJs,
    faReact,
    faNodeJs,
    faDocker,
    faGitAlt,
} from '@fortawesome/free-brands-svg-icons';
import {
    faBrain,
    faServer,
    faCode,
    faLayerGroup,
    faDatabase,
    faNetworkWired,
    faMicrochip,
    faCogs,
    faCloud,
    faShieldAlt,
    faTools,
} from '@fortawesome/free-solid-svg-icons';

const skills = [
    { name: 'Python', icon: faPython, category: 'Language' },
    { name: 'JavaScript', icon: faJs, category: 'Language' },
    { name: 'TypeScript', icon: faJs, category: 'Language' },
    { name: 'C++', icon: faCode, category: 'Language' },
    { name: 'LangGraph', icon: faNetworkWired, category: 'AI/ML' },
    { name: 'LangChain', icon: faNetworkWired, category: 'AI/ML' },
    { name: 'CrewAI', icon: faBrain, category: 'AI/ML' },
    { name: 'RAG', icon: faBrain, category: 'AI/ML' },
    { name: 'LLM', icon: faMicrochip, category: 'AI/ML' },
    { name: 'Docker', icon: faDocker, category: 'DevOps' },
    { name: 'PostgreSQL', icon: faServer, category: 'Database' },
    { name: 'MongoDB', icon: faDatabase, category: 'Database' },
    { name: 'Vector DB', icon: faLayerGroup, category: 'Database' },
    { name: 'Git', icon: faGitAlt, category: 'DevOps' },
    { name: 'React', icon: faReact, category: 'Frontend' },
    { name: 'Node.js', icon: faNodeJs, category: 'Backend' },
];

const categories = [...new Set(skills.map(s => s.category))];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06,
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

export default function Skills() {
    return (
        <section id="skills" className="skills">
            <div className="container">
                <motion.div
                    className="sectionHeader"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="sectionTitle">Technical Skills</h2>
                    <p className="sectionSubtitle">
                        Technologies and tools I use to build amazing things
                    </p>
                </motion.div>

                <motion.div
                    className="skillsGrid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                >
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            className="skillCard"
                            variants={itemVariants}
                            whileHover={{
                                y: -8,
                                scale: 1.03,
                                boxShadow: '0 20px 40px var(--shadow)',
                            }}
                            transition={{ delay: index * 0.03 }}
                        >
                            <motion.div
                                className="skillIconWrapper"
                                animate={{
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: index * 0.1,
                                }}
                            >
                                <FontAwesomeIcon icon={skill.icon} />
                            </motion.div>
                            <h3>{skill.name}</h3>
                            <p>{skill.category}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
