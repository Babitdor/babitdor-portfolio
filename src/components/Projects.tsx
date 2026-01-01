'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faSquareGithub } from '@fortawesome/free-brands-svg-icons';

const projects = [
    {
        title: 'SysML v2 Multi-Agent Workflow Automation',
        description:
            'Fine-tuned multiple LLMs on custom SysML v2 datasets using Unsloth and orchestrated multi-agent workflows with LangChain/LangGraph for automated code generation, validation, and iterative error correction, with Docker containerization.',
        tags: ['LangGraph', 'LangChain', 'Unsloth', 'Docker', 'RAG', 'ChromaDB'],
        link: 'https://github.com/Babitdor',
        github: 'https://github.com/Babitdor',
    },
    {
        title: 'Personal Knowledge Assistant',
        description:
            'Built an intelligent knowledge management platform leveraging RAG architecture, vector embeddings, and LLMs to enable conversational querying of personal document collections with semantic search.',
        tags: ['RAG', 'Vector DB', 'Embeddings', 'LLM'],
        link: 'https://github.com/Babitdor',
        github: 'https://github.com/Babitdor',
    },
    {
        title: 'Codebase QA Assistant',
        description:
            'Developed AI-powered codebase Q&A tool using LangChain, LangGraph, and ChromaDB to accelerate developer onboarding through RAG-powered natural language search.',
        tags: ['LangChain', 'LangGraph', 'ChromaDB', 'RAG'],
        link: 'https://github.com/Babitdor',
        github: 'https://github.com/Babitdor',
    },
    {
        title: 'Researcher Assistant',
        description:
            'Developed multi-agent research pipeline using CrewAI with custom tools (arXiv retrieval, PubMed search, critic validation) to conduct parallel literature searches and generate citation-backed research reports.',
        tags: ['CrewAI', 'arXiv', 'PubMed', 'Multi-Agent'],
        link: 'https://github.com/Babitdor',
        github: 'https://github.com/Babitdor',
    },
    {
        title: 'Hands-Free Desktop AI Assistant',
        description:
            'Developed real-time voice AI assistant using Livekit, locally hosted Ollama models (Llama 3, Mistral), wake-word detection, PyAutoGUI for desktop control, Gmail API, and Spotipy integration.',
        tags: ['Livekit', 'Ollama', 'Python', 'Voice AI', 'Privacy-First'],
        link: 'https://github.com/Babitdor',
        github: 'https://github.com/Babitdor',
    },
    {
        title: 'AI-Powered Task Manager',
        description:
            'Built a smart task management application with natural language processing for task creation, automatic prioritization using ML models, and collaborative features for team workflows.',
        tags: ['React', 'Node.js', 'OpenAI', 'MongoDB'],
        link: 'https://github.com/Babitdor',
        github: 'https://github.com/Babitdor',
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
    hidden: { opacity: 0, y: 50, rotateX: -5 },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: { duration: 0.6, ease: [0.25, 0.25, 0, 1] as const },
    },
};

export default function Projects() {
    return (
        <section id="projects" className="projects">
            <div className="container">
                <motion.div
                    className="sectionHeader"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="sectionTitle">Projects</h2>
                    <p className="sectionSubtitle">
                        A selection of my recent work and experiments
                    </p>
                </motion.div>

                <motion.div
                    className="projectsGrid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            className="projectCard"
                            variants={itemVariants}
                            whileHover={{
                                y: -12,
                                scale: 1.02,
                                boxShadow: '0 25px 50px var(--shadow)',
                            }}
                            transition={{ delay: index * 0.08 }}
                        >
                            <motion.div
                                className="projectImage"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <FontAwesomeIcon
                                    icon={faFolderOpen}
                                    className="projectImageIcon"
                                />
                            </motion.div>
                            <div className="projectInfo">
                                <motion.h3 whileHover={{ color: 'var(--accent)' }}>
                                    {project.title}
                                </motion.h3>
                                <p>{project.description}</p>
                                <motion.div
                                    className="projectTags"
                                    variants={{
                                        hidden: { opacity: 0 },
                                        visible: {
                                            opacity: 1,
                                            transition: { staggerChildren: 0.05 },
                                        },
                                    }}
                                >
                                    {project.tags.map((tag) => (
                                        <motion.span
                                            key={tag}
                                            variants={{
                                                hidden: { opacity: 0, scale: 0.8 },
                                                visible: {
                                                    opacity: 1,
                                                    scale: 1,
                                                },
                                            }}
                                        >
                                            {tag}
                                        </motion.span>
                                    ))}
                                </motion.div>
                                <div className="projectLinks">
                                    <motion.a
                                        href={project.github}
                                        className="projectLink"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Code
                                    </motion.a>
                                    {project.link && (
                                        <motion.a
                                            href={project.link}
                                            className="projectLink"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <FontAwesomeIcon icon={faExternalLinkAlt} />
                                            Demo
                                        </motion.a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
