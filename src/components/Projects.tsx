'use client';

import { useState } from 'react';
import TuiPane from './TuiPane';

const projects = [
  {
    title: 'Multi-Agent Research Intelligence System',
    description:
      'Advanced AI-powered multi-agent research system orchestrating specialised agents to conduct comprehensive research, synthesise information and generate professional reports. Features 10 research strategies, parallel swarm research, self-critique quality control, RAG knowledge management, and dual-format report generation (Markdown + PDF).',
    tags: ['LangGraph', 'LangChain', 'Python', 'RAG', 'ChromaDB', 'Multi-Agent', 'Ollama'],
    link: 'https://github.com/Babitdor',
  },
  {
    title: 'SysML v2 Multi-Agent Workflow Automation',
    description:
      'Sophisticated AI-powered system for generating and validating SysML v2 code using a multi-agent architecture with RAG and vector database integration. Features intelligent context-aware code generation, automated multi-step validation with syntax and semantic checks, automatic error detection and fixing, knowledge management with RAG, solution memory in ChromaDB, optional human approval with feedback integration, and a real-time analytics dashboard.',
    tags: [
      'LangGraph',
      'LangChain',
      'Python',
      'RAG',
      'ChromaDB',
      'Ollama',
      'Streamlit',
      'Multi-Agent',
      'Jupyter',
      'PyTorch',
    ],
    link: 'https://github.com/Babitdor',
  },
  {
    title: 'Nami-Code: Deep Agent Framework & AI Coding Assistant',
    description:
      'Open-source AI agent framework and terminal-based coding assistant enabling LLMs to handle complex multi-step tasks through advanced planning, context management and parallel execution. Features planning tools, filesystem operations, subagent spawning, persistent memory, and MCP support for extensible tool integration.',
    tags: ['LangGraph', 'LangChain', 'Python', 'Prompt Engineering', 'OpenAI', 'Anthropic', 'Ollama', 'MCP'],
    link: 'https://github.com/Babitdor',
  },
  {
    title: 'S.A.R.A.H. – Smart Assistant Real At Heart',
    description:
      'A fully local desktop voice assistant powered by a fine-tuned LLaMA 3.2 model. Uses a real-time STT → LLM → TTS pipeline with LiveKit for voice streaming, Deepgram for speech-to-text and Cartesia AI for natural voice responses. Understands natural language commands and invokes tools such as launching apps, reading emails or organising files — all while running 100% offline.',
    tags: ['LLaMA 3.2', 'LiveKit', 'Deepgram', 'Cartesia AI', 'Voice Assistant', 'STT', 'TTS', 'Local AI'],
    link: 'https://github.com/Babitdor',
  },
  {
    title: 'Speaker Voice Separation with Dual-Path Transformers',
    description:
      'Enhancing the Dual-Path RNN framework by replacing the original recurrent modules with intra-chunk and inter-chunk Transformer layers. The hybrid architecture captures both local and global audio dependencies for superior multi-speaker separation. The intra-chunk Transformer applies self-attention within small audio chunks to model fine-grained short-term features, while the inter-chunk Transformer captures long-range context across chunk sequences.',
    tags: ['PyTorch', 'Transformers', 'Audio Processing', 'Speaker Separation', 'Deep Learning', 'SI-SNR', 'SDR'],
    link: 'https://github.com/Babitdor',
  },
  {
    title: 'Assistive Sidewalk Segmentation: Fine-Tuning SAM 2.1',
    description:
      'Developed a comprehensive training and deployment pipeline for fine-tuning Segment Anything Model (SAM) 2.1 on custom sidewalk imagery, aimed at enabling assistive vision systems for the visually impaired. Spans data preprocessing, dynamic prompt generation, mixed-precision training, checkpointing and model evaluation, culminating in an interactive Streamlit application for real-time segmentation and inference.',
    tags: [
      'SAM 2.1',
      'PyTorch',
      'Hugging Face',
      'Streamlit',
      'Computer Vision',
      'Fine-Tuning',
      'Assistive Technology',
      'FP16/BF16',
    ],
    link: 'https://github.com/Babitdor',
  },
  {
    title: 'ogAI: Multi-Model LLM Discord Assistant',
    description:
      'A fully customisable AI-powered Discord bot integrating multiple local and cloud-based language models (Ollama, Gemini, GPT-4) to deliver intelligent, context-aware responses for general Q&A, summarisation and creative tasks. Features multiple backends, flexible routing logic that selects a model based on the task or user input, prompt templates, system messages and conversation context tracking.',
    tags: ['discord.py', 'OpenAI GPT', 'Google Gemini', 'Ollama', 'LLM', 'Discord Bot', 'Multi-Model', 'Async'],
    link: 'https://github.com/Babitdor',
  },
  {
    title: 'N8N-Framework: AI-Powered SysMLv2 Systems Engineering Platform',
    description:
      'Advanced AI-powered systems engineering platform integrating SysMLv2 with multi-agent LLMs to assist in designing, modelling, analysing and optimising complex systems. Built on n8n workflow automation, it features AI-driven code generation, multi-agent analysis (KPI-Analyst, SysML-Expert, MA-Solver), rigorous ANTLR4-based validation, Eclipse SysON integration for visual modelling, and knowledge management with RAG.',
    tags: [
      'n8n',
      'Next.js',
      'LangGraph',
      'LangChain',
      'FastAPI',
      'SysMLv2',
      'Multi-Agent',
      'RAG',
      'Qdrant',
      'PostgreSQL',
      'Docker',
      'Eclipse SysON',
    ],
    link: 'https://github.com/Babitdor',
  },
];

export default function Projects() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="projects" className="tuiSection">
      <div className="tuiSection__inner tuiSection__inner--wide">
        <TuiPane title="~/projects/" status={`${projects.length} entries`} command="ls ~/projects/">
          <div className="tuiProjects">
            {projects.map((project, index) => {
              const isOpen = open === index;
              return (
                <article className="tuiProject" key={project.title}>
                  <button
                    type="button"
                    className="tuiProject__head"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : index)}
                  >
                    <span className="tuiProject__index">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="tuiProject__title">{project.title}</span>
                    <span className="tuiProject__toggle" aria-hidden="true">
                      {isOpen ? '[-]' : '[+]'}
                    </span>
                  </button>

                  {isOpen ? (
                    <div className="tuiProject__body">
                      <p className="tuiProject__desc">{project.description}</p>

                      <div className="tuiTagRow">
                        {project.tags.map((tag) => (
                          <span className="tuiChip" key={tag}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="tuiProject__links">
                        <a
                          className="tuiBtn tuiBtn--ghost"
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          [ source ↗ ]
                        </a>
                      </div>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </TuiPane>
      </div>
    </section>
  );
}
