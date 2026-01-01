'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faSquareGithub } from '@fortawesome/free-brands-svg-icons';

const projects = [
    {
        title: 'Multi-Agent Research Intelligence System',
        description:
            'Advanced AI-powered multi-agent research system orchestrating specialized AI agents to conduct comprehensive research, synthesize information, and generate professional reports. Features 10 research strategies, parallel swarm research, self-critique quality control, RAG knowledge management, and dual-format report generation (Markdown + PDF).',
        tags: ['LangGraph', 'LangChain', 'Python', 'RAG', 'ChromaDB', 'Multi-Agent', 'Ollama'],
        link: 'https://github.com/Babitdor',
        github: 'https://github.com/Babitdor',
    },
    {
        title: 'SysML v2 Multi-Agent Workflow Automation',
        description:
            'Sophisticated AI-powered system for generating and validating SysML v2 code using multi-agent architecture with RAG and vector database integration. Features intelligent code generation with context awareness, automated multi-step validation with syntax and semantic checks, automatic error detection and fixing, knowledge management with RAG system, solution memory using ChromaDB vector database, optional human approval with feedback integration, and real-time analytics dashboard.',
        tags: ['LangGraph', 'LangChain', 'Python', 'RAG', 'ChromaDB', 'Ollama', 'Streamlit', 'Multi-Agent', 'Jupyter', 'PyTorch'],
        link: 'https://github.com/Babitdor',
        github: 'https://github.com/Babitdor',
    },

    {
        title: 'Nami-Code: Deep Agent Framework & AI Coding Assistant',
        description:
            'Open-source AI agent framework and terminal-based coding assistant enabling LLMs to handle complex multi-step tasks through advanced planning, context management, and parallel execution. Features planning tools, filesystem operations, subagent spawning, persistent memory, and MCP support for extensible tool integration.',
        tags: ['LangGraph', 'LangChain', 'Python', 'Prompt Engineering', 'OpenAI', 'Anthropic', 'Ollama', 'MCP'],
        link: 'https://github.com/Babitdor',
        github: 'https://github.com/Babitdor',
    },
    {
        title: 'S.A.R.A.H. – Smart Assistant Real At Heart',
        description:
            'A fully local desktop voice assistant powered by a fine-tuned LLaMA 3.2 model. Uses a real-time STT → LLM → TTS pipeline with LiveKit for voice streaming, Deepgram for speech-to-text, and Cartesia AI for natural voice responses. Can understand natural language commands and invoke tools like launching apps, reading emails, or organizing files — all while running 100% offline for complete privacy.',
        tags: ['LLaMA 3.2', 'LiveKit', 'Deepgram', 'Cartesia AI', 'Voice Assistant', 'STT', 'TTS', 'Local AI'],
        link: 'https://github.com/Babitdor',
        github: 'https://github.com/Babitdor',
    },
    {
        title: 'Speaker Voice Separation with Dual-Path Transformers',
        description:
            'Enhancing the Dual-Path RNN framework by replacing the original recurrent modules with intra-chunk and inter-chunk Transformer layers. This hybrid architecture aims to better capture both local and global audio dependencies for superior multi-speaker separation. Intra-chunk Transformer applies self-attention within small audio chunks to model fine-grained, short-term temporal features, while Inter-chunk Transformer captures long-range context by attending across chunk sequences.',
        tags: ['PyTorch', 'Transformers', 'Audio Processing', 'Speaker Separation', 'Deep Learning', 'SI-SNR', 'SDR'],
        link: 'https://github.com/Babitdor',
        github: 'https://github.com/Babitdor',
    },
    {
        title: 'Assistive Sidewalk Segmentation: Fine-Tuning SAM 2.1 with a Custom Dataset for the Visually Impaired',
        description:
            'Developed a comprehensive training and deployment pipeline for fine-tuning Segment Anything Model (SAM) 2.1 by Meta on custom sidewalk imagery, aimed at enabling assistive vision systems for the visually impaired. The project spans data preprocessing, dynamic prompt generation, mixed-precision training, checkpointing, and model evaluation, culminating in an interactive Streamlit application for real-time segmentation and inference.',
        tags: ['SAM 2.1', 'PyTorch', 'Hugging Face', 'Streamlit', 'Computer Vision', 'Fine-Tuning', 'Assistive Technology', 'FP16/BF16'],
        link: 'https://github.com/Babitdor',
        github: 'https://github.com/Babitdor',
    },
    {
        title: 'ogAI: Multi-Model LLM Discord Assistant',
        description:
            'Built a fully customizable AI-powered Discord bot that integrates multiple local and cloud-based language models (e.g., Ollama, Gemini, GPT-4) to deliver intelligent, context-aware responses across diverse use cases including general Q&A, summarization, and creative tasks. Features integrated multiple backends, flexible routing logic to dynamically select models based on task or user input, prompt templates, system messages, and conversation context tracking.',
        tags: ['discord.py', 'OpenAI GPT', 'Google Gemini', 'Ollama', 'LLM', 'Discord Bot', 'Multi-Model', 'Async'],
        link: 'https://github.com/Babitdor',
        github: 'https://github.com/Babitdor',
    },
    {
        title: 'N8N-Framework: AI-Powered SysMLv2 Systems Engineering Platform',
        description:
            'Advanced AI-powered systems engineering platform integrating SysMLv2 with multi-agent LLMs to assist in designing, modeling, analyzing, and optimizing complex systems. Built on n8n workflow automation, features AI-driven code generation, multi-agent analysis (KPI-Analyst, SysML-Expert, MA-Solver), rigorous ANTLR4-based validation, Eclipse SysON integration for visual modeling, and comprehensive knowledge management with RAG capabilities.',
        tags: ['n8n', 'Next.js', 'LangGraph', 'LangChain', 'FastAPI', 'SysMLv2', 'Multi-Agent', 'RAG', 'Qdrant', 'PostgreSQL', 'Docker', 'Eclipse SysON'],
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
                                {/* <div className="projectLinks">
                                    <motion.a
                                        href={project.github}
                                        className="projectLink"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FontAwesomeIcon icon={faSquareGithub} />
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
                                </div> */}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
