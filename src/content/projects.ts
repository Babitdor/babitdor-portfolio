/**
 * Projects, rebuilt from the actual public repositories.
 *
 * Every `link` points at a repo that exists (verified via the GitHub API), and
 * each description is derived from that repo own description plus the notes in
 * its root. The previous version linked every card to the bare profile page,
 * which made the links useless.
 */

export type Project = {
  title: string;
  blurb: string;
  detail: string;
  tags: string[];
  /** Omitted when there is no public repository, rather than linking nowhere. */
  link?: string;
  /** Short marker shown on the card instead of a link. */
  stat?: string;
};

export const projects: Project[] = [
  {
    title: 'SysML v2 Multi-Agent Workflow Automation',
    blurb: 'Fine-tuned LLMs plus agentic validation for Model-Based Systems Engineering.',
    detail:
      'Agentic pipeline that generates and validates SysML v2 models from natural language. Multiple fine-tuned models orchestrated with LangGraph, a RAG store of error-correction manuals and approved solutions in ChromaDB, and iterative self-correction on validation failure. Syntax checking runs against a real parser rather than a regex.',
    tags: ['LangGraph', 'SysML v2', 'Unsloth', 'Fine-tuning', 'RAG', 'ChromaDB', 'Docker'],
    link: 'https://github.com/Babitdor/SysMLv2-CodeGeneration_AgenticWorkflow',
    stat: '2 stars',
  },
  {
    title: 'NovaCode: Deep Agent Framework and Coding Assistant',
    blurb: 'Open-source terminal AI coding assistant, built on deepagents.',
    detail:
      'A terminal-based agent harness: planning, filesystem tools, subagent spawning, persistent memory and MCP support for extensible tooling. Handles multi-step coding tasks with context management and parallel execution. MIT licensed.',
    tags: ['Deep Agents', 'LangGraph', 'MCP', 'Python', 'Subagents', 'TUI'],
    link: 'https://github.com/Babitdor/NovaCode',
    stat: '2 stars · MIT',
  },
  {
    title: 'NAMI Researcher',
    blurb: 'Multi-agent research assistant with 10 research strategies.',
    detail:
      'Parallel swarm research with specialised agents, self-critique quality control, RAG knowledge management and dual-format report generation (Markdown and PDF). Runs on local or hosted models.',
    tags: ['Multi-Agent', 'LangGraph', 'RAG', 'CrewAI', 'Ollama'],
    link: 'https://github.com/Babitdor/NAMI-RESEARCHER',
  },
  {
    title: 'Assistive Sidewalk Segmentation — SAM 2.1',
    blurb: 'Fine-tuning Segment Anything 2.1 for assistive vision. Master project.',
    detail:
      'Full training and deployment pipeline for fine-tuning SAM 2.1 on custom sidewalk imagery, aimed at assistive navigation for the visually impaired. Dynamic prompt generation, FP16/BF16 mixed-precision training, YAML-configured components, visual prompt/mask verification and a Streamlit demo for real-time inference.',
    tags: ['SAM 2.1', 'PyTorch', 'Hugging Face Accelerate', 'Streamlit', 'Computer Vision', 'FP16'],
    link: 'https://github.com/Babitdor/FineTune-Script-SAM2.1',
    stat: '1 star',
  },
  {
    title: 'S.A.R.A.H. — Local Desktop Voice Assistant',
    blurb: 'Real-time STT to LLM to TTS pipeline, fully offline.',
    detail:
      'A fully local desktop voice assistant on a fine-tuned LLaMA 3.2, with LiveKit for voice streaming, Deepgram for speech-to-text and Cartesia for natural responses. Understands natural-language commands and invokes tools: launching apps, reading mail, organising files. Emits structured tool calls for backend execution, 100% offline.',
    tags: ['LLaMA 3.2', 'LiveKit', 'Deepgram', 'Cartesia', 'STT/TTS', 'Local AI'],
    stat: 'private build',
  },
  {
    title: 'Speaker Voice Separation — Dual-Path Transformers',
    blurb: 'Replacing Dual-Path RNN recurrence with Transformer attention.',
    detail:
      'Enhances the Dual-Path RNN framework by swapping the recurrent modules for intra-chunk and inter-chunk Transformer layers. The intra-chunk Transformer models fine-grained short-term features; the inter-chunk Transformer captures long-range context across chunk sequences, improving separation of overlapping speakers. Evaluated with SI-SNR and SDR.',
    tags: ['PyTorch', 'Transformers', 'Audio', 'SI-SNR', 'SDR'],
    link: 'https://github.com/Babitdor/SpeakerVoiceSeparation_UsingDualPathTransformers',
  },
  {
    title: 'ogAI — Multi-Model LLM Discord Assistant',
    blurb: 'Routing across GPT, Gemini and local Ollama models.',
    detail:
      'A customisable Discord assistant integrating multiple local and cloud model backends with routing logic that selects a model per task. Prompt templates, system messages, conversation-context tracking, token-efficiency measures and fallbacks. Privacy-aware offline inference via Ollama.',
    tags: ['discord.py', 'GPT', 'Gemini', 'Ollama', 'Async', 'Model Routing'],
    link: 'https://github.com/Babitdor/ogAI_DiscordBot',
  },
  {
    title: 'LLM Fine-Tuning with Unsloth',
    blurb: 'QLoRA fine-tuning pipelines for domain-specific models.',
    detail:
      'Fine-tuning harness built on Unsloth for QLoRA runs, producing the domain models published on Ollama and Hugging Face below. Covers dataset preparation, training configuration and export for local serving.',
    tags: ['Unsloth', 'QLoRA', 'Fine-tuning', 'Hugging Face'],
    link: 'https://github.com/Babitdor/LLM-FineTuning_unsloth',
  },
  {
    title: 'Fetal Biometric Structure Segmentation',
    blurb: 'Medical image segmentation on fetal ultrasound.',
    detail:
      'Segmentation of fetal biometric structures from ultrasound imagery, built as an applied deep-learning pipeline in Python.',
    tags: ['PyTorch', 'Segmentation', 'Medical Imaging'],
    link: 'https://github.com/Babitdor/fetal_biometric_structure_segmentation',
  },
];
