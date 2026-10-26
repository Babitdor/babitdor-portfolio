/**
 * Projects, rebuilt from the actual public repositories.
 *
 * Every `link` points at a repo that exists (verified via the GitHub API). Each
 * description is derived from that repo's own description and the notes in its
 * root. `caseStudy` is the long-form record shown at /work/[slug]; it is written
 * from the same verified material, not invented.
 */

export type TraceStep = {
  label: string;
  detail: string;
};

export type Metric = {
  value: string;
  label: string;
};

export type CaseStudy = {
  /** Short context line for the record header. */
  context: string;
  problem: string;
  approach: string;
  result: string;
  trace: TraceStep[];
  metrics: Metric[];
};

export type Project = {
  slug: string;
  title: string;
  /** Shorter label for the home index where the full title wraps too far. */
  shortTitle: string;
  blurb: string;
  detail: string;
  tags: string[];
  /** Omitted when there is no public repository, rather than linking nowhere. */
  link?: string;
  /** Short marker shown on the index instead of a link. */
  stat?: string;
  caseStudy: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: 'mbse-multi-agent-harness',
    title: 'MBSE Multi-Agent Harness',
    shortTitle: 'MBSE Multi-Agent Harness',
    blurb: 'A nine-agent orchestrator turning requirements into validated SysML v2 models.',
    detail:
      'Multi-agent orchestrator for automated Model-Based Systems Engineering, producing validated SysML v2 artifacts end to end. Resolves 50+ dependency DAG nodes automatically across all four RFLP phases: Requirements, Functional, Logical, Physical. Agents run in a Docker sandbox backend serving 25 concurrent connections with a one-second artifact cache, cutting redundant Docker exec calls by roughly half. SSE streaming holds token display latency under 100ms with live status across nine concurrent subagents. Validation runs against an ANTLR4 SysML v2 parser with zero syntax tolerance across 100+ language constructs. Deployed on gunicorn with four uvicorn workers behind nginx.',
    tags: ['LangGraph', 'SysML v2', 'Multi-Agent', 'Docker', 'SSE', 'ANTLR4', 'FastAPI', 'Next.js'],
    stat: 'master thesis',
    caseStudy: {
      context: 'Master thesis · Institute FAPS, FAU Erlangen-Nürnberg',
      problem:
        'Turning a requirements document into a valid SysML v2 model is still mostly manual. The syntax is strict, the four RFLP phases depend on each other, and one malformed reference can invalidate the whole artifact.',
      approach:
        'A nine-agent orchestrator plans the model, resolves a dependency DAG across all four RFLP phases, and runs the work inside a Docker sandbox. Every artifact is validated by an ANTLR4 SysML v2 parser before the next agent receives it. A one-second artifact cache keeps repeated Docker exec calls down.',
      result:
        'The harness resolves more than 50 DAG nodes without manual intervention and holds token display latency under 100ms with nine concurrent subagents. It served 25 concurrent connections in testing and cut redundant Docker exec calls by roughly half.',
      trace: [
        { label: 'requirements', detail: 'natural-language input' },
        { label: 'planner', detail: 'scope and phases' },
        { label: 'dag', detail: '50+ dependency nodes' },
        { label: 'agents', detail: '9 workers across RFLP' },
        { label: 'parser', detail: 'ANTLR4, zero tolerance' },
        { label: 'artifacts', detail: 'validated SysML v2' },
      ],
      metrics: [
        { value: '9', label: 'concurrent agents' },
        { value: '50+', label: 'DAG nodes resolved' },
        { value: '<100ms', label: 'token display latency' },
        { value: '25', label: 'concurrent connections' },
      ],
    },
  },
  {
    slug: 'sysml-v2-workflow',
    title: 'SysML v2 Multi-Agent Workflow Automation',
    shortTitle: 'SysML v2 Workflow',
    blurb: 'Fine-tuned models and agentic validation for Model-Based Systems Engineering.',
    detail:
      "Agentic pipeline that generates and validates SysML v2 models from natural language. Multiple fine-tuned models are orchestrated with LangGraph, a RAG store of error-correction manuals and approved solutions lives in ChromaDB, and the loop repeats until validation passes. Syntax checking runs against a real parser rather than a regex.",
    tags: ['LangGraph', 'SysML v2', 'Unsloth', 'Fine-tuning', 'RAG', 'ChromaDB', 'Docker'],
    link: 'https://github.com/Babitdor/SysMLv2-CodeGeneration_AgenticWorkflow',
    stat: '2 stars',
    caseStudy: {
      context: 'Open source · Agentic pipeline',
      problem:
        'A general model can write plausible SysML v2 that fails a real parser. One-shot generation gives no path back from a syntax error.',
      approach:
        'Fine-tuned models generate the first draft. LangGraph orchestrates validation and correction, and ChromaDB retrieves error-correction manuals and approved solutions. The loop repeats until the artifact passes a real parser.',
      result:
        'The pipeline turns natural language into validated SysML v2 models and keeps the correction examples that worked. Retrieval is part of the loop, not a decoration bolted onto the prompt.',
      trace: [
        { label: 'prompt', detail: 'natural language' },
        { label: 'model', detail: 'fine-tuned draft' },
        { label: 'parser', detail: 'real syntax check' },
        { label: 'retrieve', detail: 'ChromaDB corrections' },
        { label: 'repair', detail: 'iterative self-correction' },
        { label: 'model', detail: 'validated SysML v2' },
      ],
      metrics: [
        { value: 'ANTLR4', label: 'parser, not regex' },
        { value: 'ChromaDB', label: 'correction store' },
        { value: 'LangGraph', label: 'orchestration' },
      ],
    },
  },
  {
    slug: 'novacode',
    title: 'NovaCode: Terminal Coding Agent',
    shortTitle: 'NovaCode',
    blurb: 'Open-source terminal AI coding assistant, built on deepagents.',
    detail:
      'A terminal-based agent harness with planning, filesystem tools, subagent spawning, persistent memory, and MCP support for extensible tooling. It handles multi-step coding tasks with context management and parallel execution. MIT licensed.',
    tags: ['Deep Agents', 'LangGraph', 'MCP', 'Python', 'Subagents', 'TUI'],
    link: 'https://github.com/Babitdor/NovaCode',
    stat: '2 stars · MIT',
    caseStudy: {
      context: 'Open source · MIT',
      problem:
        'Most terminal coding assistants are a single prompt wrapped around a model. Real repository work needs planning, file tools, persistent context, and a way to add tools without forking the harness.',
      approach:
        'NovaCode is built on deepagents: a planning loop, filesystem tools, subagent spawning, persistent memory, and MCP support. It is a harness, not a prompt.',
      result:
        'The project ships under MIT and handles multi-step coding tasks with context management and parallel execution. It is the base for the same kind of agent work the other case files depend on.',
      trace: [
        { label: 'task', detail: 'natural language' },
        { label: 'plan', detail: 'decompose the work' },
        { label: 'tools', detail: 'filesystem + MCP' },
        { label: 'subagents', detail: 'parallel workers' },
        { label: 'verify', detail: 'run the checks' },
        { label: 'patch', detail: 'apply and report' },
      ],
      metrics: [
        { value: 'MIT', label: 'license' },
        { value: 'MCP', label: 'tool protocol' },
        { value: 'TUI', label: 'interface' },
      ],
    },
  },
  {
    slug: 'sidewalk-segmentation',
    title: 'Assistive Sidewalk Segmentation with SAM 2.1',
    shortTitle: 'Sidewalk Segmentation',
    blurb: 'Fine-tuning Segment Anything 2.1 for assistive vision. Master project.',
    detail:
      'Full training and deployment pipeline for fine-tuning SAM 2.1 on custom sidewalk imagery, aimed at assistive navigation for the visually impaired. Dynamic prompt generation, FP16/BF16 mixed-precision training, YAML-configured components, visual prompt and mask verification, and a Streamlit demo for real-time inference.',
    tags: [
      'SAM 2.1',
      'PyTorch',
      'Hugging Face Accelerate',
      'Streamlit',
      'Computer Vision',
      'FP16',
    ],
    link: 'https://github.com/Babitdor/FineTune-Script-SAM2.1',
    stat: '1 star',
    caseStudy: {
      context: 'Master project · Computer vision',
      problem:
        'Assistive navigation needs pixel-level segmentation on sidewalk imagery that general-purpose models have not seen. Prompting a frozen SAM model is not enough when the domain shifts.',
      approach:
        'Fine-tune SAM 2.1 with dynamic prompt generation, mixed-precision training, and YAML-configured components. A visual verification step catches bad prompts and masks before they enter the next run, and a Streamlit app exposes real-time inference.',
      result:
        'The result is a reproducible training and deployment pipeline, not a notebook. The demo shows the model segmenting the custom imagery it was trained on.',
      trace: [
        { label: 'imagery', detail: 'custom sidewalk set' },
        { label: 'prompts', detail: 'generated per sample' },
        { label: 'sam 2.1', detail: 'mixed precision' },
        { label: 'masks', detail: 'visual check' },
        { label: 'export', detail: 'reproducible weights' },
        { label: 'streamlit', detail: 'real-time demo' },
      ],
      metrics: [
        { value: 'FP16', label: 'mixed precision' },
        { value: 'SAM 2.1', label: 'base model' },
        { value: 'Streamlit', label: 'live demo' },
      ],
    },
  },
  {
    slug: 'sarah-voice-assistant',
    title: 'S.A.R.A.H.: Local Desktop Voice Assistant',
    shortTitle: 'S.A.R.A.H.',
    blurb: 'Real-time speech to LLM to speech pipeline, fully offline.',
    detail:
      'A fully local desktop voice assistant on a fine-tuned LLaMA 3.2, with LiveKit for voice streaming, Deepgram for speech to text, and Cartesia for natural responses. It understands natural-language commands and invokes tools: launching apps, reading mail, organising files. Structured tool calls go to the desktop layer for execution, 100% offline.',
    tags: ['LLaMA 3.2', 'LiveKit', 'Deepgram', 'Cartesia', 'STT/TTS', 'Local AI'],
    stat: 'private build',
    caseStudy: {
      context: 'Private build · Local AI',
      problem:
        'Voice assistants usually trade privacy for capability. A desktop assistant that reads mail and moves files should not need a cloud round trip for every command.',
      approach:
        'A fine-tuned LLaMA 3.2 runs the reasoning. LiveKit handles the real-time audio path, Deepgram handles speech to text, and Cartesia handles the voice. Tool calls are structured so the model can launch apps, read mail, and organise files.',
      result:
        'The assistant runs fully offline and keeps the tool boundary explicit. The model decides what to call, and the desktop layer decides what is allowed.',
      trace: [
        { label: 'voice', detail: 'always-on input' },
        { label: 'stt', detail: 'Deepgram' },
        { label: 'llama 3.2', detail: 'local reasoning' },
        { label: 'tools', detail: 'apps, mail, files' },
        { label: 'action', detail: 'desktop layer' },
        { label: 'tts', detail: 'Cartesia voice' },
      ],
      metrics: [
        { value: '100%', label: 'offline' },
        { value: 'LLaMA 3.2', label: 'fine-tuned' },
        { value: 'LiveKit', label: 'voice transport' },
      ],
    },
  },
  {
    slug: 'speaker-separation',
    title: 'Speaker Voice Separation with Dual-Path Transformers',
    shortTitle: 'Speaker Separation',
    blurb: 'Replacing Dual-Path RNN recurrence with Transformer attention.',
    detail:
      'Enhances the Dual-Path RNN framework by swapping the recurrent modules for intra-chunk and inter-chunk Transformer layers. The intra-chunk Transformer models fine-grained short-term features; the inter-chunk Transformer captures long-range context across chunk sequences, improving separation of overlapping speakers. Evaluated with SI-SNR and SDR.',
    tags: ['PyTorch', 'Transformers', 'Audio', 'SI-SNR', 'SDR'],
    link: 'https://github.com/Babitdor/SpeakerVoiceSeparation_UsingDualPathTransformers',
    caseStudy: {
      context: 'Research project · Audio',
      problem:
        'Dual-Path RNNs separate overlapping speakers well, but recurrence limits how far context can travel between chunks.',
      approach:
        'Replace the recurrent modules with intra-chunk and inter-chunk Transformer layers. The first models short-term detail; the second carries context across chunk sequences. Evaluation uses SI-SNR and SDR.',
      result:
        'The modified architecture improves separation of overlapping speakers while keeping the dual-path structure. The work is a clean comparison of recurrence versus attention inside the same framework.',
      trace: [
        { label: 'mixture', detail: 'overlapping speech' },
        { label: 'encoder', detail: 'learned features' },
        { label: 'intra-chunk', detail: 'short-term attention' },
        { label: 'inter-chunk', detail: 'long-range context' },
        { label: 'masks', detail: 'per speaker' },
        { label: 'audio', detail: 'separated streams' },
      ],
      metrics: [
        { value: 'SI-SNR', label: 'evaluation' },
        { value: 'SDR', label: 'evaluation' },
        { value: '2 paths', label: 'attention' },
      ],
    },
  },
  {
    slug: 'ogai-discord',
    title: 'ogAI: Multi-Model LLM Discord Assistant',
    shortTitle: 'ogAI',
    blurb: 'Routing across GPT, Gemini, and local Ollama models.',
    detail:
      'A customisable Discord assistant integrating multiple local and cloud model backends with routing logic that selects a model per task. Prompt templates, system messages, conversation-context tracking, token-efficiency measures, and fallbacks. Privacy-aware offline inference via Ollama.',
    tags: ['discord.py', 'GPT', 'Gemini', 'Ollama', 'Async', 'Model Routing'],
    link: 'https://github.com/Babitdor/ogAI_DiscordBot',
    caseStudy: {
      context: 'Open source · Discord',
      problem:
        'A Discord assistant gets very different requests in the same channel. Sending every one to the same model wastes tokens and ignores privacy.',
      approach:
        'ogAI routes each request across GPT, Gemini, and local Ollama models, with prompt templates, conversation context, token-efficiency measures, and fallbacks. The router picks the model per task.',
      result:
        'The assistant keeps working when a cloud model is unavailable and can stay fully local when privacy matters. Routing is configuration, not a rewrite.',
      trace: [
        { label: 'message', detail: 'Discord event' },
        { label: 'router', detail: 'task + policy' },
        { label: 'cloud', detail: 'GPT or Gemini' },
        { label: 'local', detail: 'Ollama fallback' },
        { label: 'context', detail: 'conversation state' },
        { label: 'reply', detail: 'Discord thread' },
      ],
      metrics: [
        { value: '3', label: 'model backends' },
        { value: 'Async', label: 'discord.py' },
        { value: 'Local', label: 'Ollama fallback' },
      ],
    },
  },
  {
    slug: 'unsloth-finetuning',
    title: 'LLM Fine-Tuning with Unsloth',
    shortTitle: 'Unsloth Fine-Tuning',
    blurb: 'QLoRA fine-tuning pipelines for domain-specific models.',
    detail:
      'Fine-tuning harness built on Unsloth for QLoRA runs, producing the domain models published on Ollama and Hugging Face. Covers dataset preparation, training configuration, evaluation, and export for local serving.',
    tags: ['Unsloth', 'QLoRA', 'Fine-tuning', 'Hugging Face'],
    link: 'https://github.com/Babitdor/LLM-FineTuning_unsloth',
    caseStudy: {
      context: 'Open source · Fine-tuning',
      problem:
        'Domain-specific models are only useful if the training run is reproducible and the export actually serves.',
      approach:
        'A QLoRA harness on Unsloth covers dataset preparation, training configuration, evaluation, and export. The output models are published to Ollama and Hugging Face and served locally.',
      result:
        'Three SysML v2 models are live with more than 1,000 pulls combined. The pipeline is the reason the numbers exist, not a one-off training script.',
      trace: [
        { label: 'dataset', detail: 'domain examples' },
        { label: 'qlora', detail: 'Unsloth training' },
        { label: 'eval', detail: 'output checks' },
        { label: 'export', detail: 'merged weights' },
        { label: 'ollama', detail: 'local serving' },
        { label: 'hugging face', detail: 'public release' },
      ],
      metrics: [
        { value: '3', label: 'models published' },
        { value: '1,000+', label: 'combined pulls' },
        { value: 'QLoRA', label: 'training' },
      ],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
