/**
 * Single source of truth for the site personal content.
 *
 * Every fact here was verified against a primary source (GitHub API, the live
 * LinkedIn profile, the certificate verification page, Hugging Face, Ollama,
 * ORCID) rather than copied from the earlier notes files, which had drifted.
 * Where a claim could NOT be verified it is deliberately absent, not guessed.
 *
 * Change a fact here and every section updates at once.
 */

export const identity = {
  name: 'Babitdor Kayang Khonglah',
  handle: 'babitdor',
  location: 'Erlangen, Germany',
  email: 'babitdorbryan14@gmail.com',
  phone: '+49 176 37280448',
  role: 'AI Engineer',
  github: 'https://github.com/Babitdor',
  linkedin: 'https://www.linkedin.com/in/babitdor-kayang-khonglah-aa1b68207/',
  huggingface: 'https://huggingface.co/babit14',
  huggingfaceLabel: 'huggingface.co/babit14',
  ollama: 'https://ollama.com/Babitdor',
  ollamaLabel: 'ollama.com/Babitdor',
  orcid: 'https://orcid.org/0009-0008-6942-4369',
} as const;

/**
 * Experience. Job titles and dates at FAPS are not public on the logged-out
 * LinkedIn view, so entries are described by organisation only. No invented dates.
 */
export const experience = [
  {
    role: 'AI Engineer',
    org: 'Siemens Digital Industries Software',
    place: 'Nuremberg, Germany',
    period: 'current',
    detail: 'Building production-grade AI agent systems for enterprise engineering.',
  },
  {
    role: 'Research affiliation',
    org: 'Institute FAPS, FAU Erlangen–Nürnberg',
    place: 'Erlangen, Germany',
    period: 'current',
    detail: 'Chair of Manufacturing Automation and Production Systems.',
  },
] as const;

export const education = [
  {
    degree: 'M.Sc. Artificial Intelligence',
    school: 'Friedrich-Alexander-Universität Erlangen–Nürnberg',
    period: '04/2024 – 09/2026',
    place: 'Germany',
  },
  {
    degree: 'B.Tech. Computer Science & Engineering',
    school: 'National Institute of Technology, Meghalaya',
    period: '04/2018 – 04/2022',
    place: 'India',
  },
] as const;

/** Certifications, each confirmed on the issuer own verification page. */
export const certifications = [
  {
    name: 'Project: Deep Agents',
    issuer: 'LangChain Academy',
    issued: '2026-03',
    id: 'fespcve8ba',
    url: 'https://academy.langchain.com/certificates/fespcve8ba',
  },
  {
    name: 'AI Agents Fundamentals',
    issuer: 'Hugging Face',
    issued: '2025-05',
    id: 'babit14',
    url: 'https://huggingface.co/datasets/agents-course/certificates/resolve/main/certificates/babit14/2025-05-08.png',
  },
] as const;

/**
 * Models he has published and that are live right now. Pull counts are from
 * ollama.com/Babitdor and are the strongest public evidence of real use.
 */
export const publishedModels = [
  { name: 'Qwen2.5-Coder-SysMLv2', pulls: '1,011+', note: 'system modelling' },
  { name: 'Qwen3-8B-SysMLv2', pulls: '113+', note: 'system modelling' },
  { name: 'Qwen3-4B-SysMLv2', pulls: '43+', note: 'system modelling' },
] as const;

/** Skills, grouped. From Information.md, which agrees with GitHub and LinkedIn. */
export const skillGroups = [
  {
    category: 'AI / AGENTS',
    items: [
      'LangGraph',
      'LangChain',
      'LangSmith',
      'Deep Agents',
      'CrewAI',
      'Google ADK',
      'OpenAI Agents SDK',
      'MCP',
      'RAG',
      'Embeddings',
      'LoRA / QLoRA',
    ],
  },
  {
    category: 'LANGUAGES',
    items: ['Python', 'TypeScript', 'JavaScript', 'C++', 'C'],
  },
  {
    category: 'MODELS / LOCAL AI',
    items: ['Ollama', 'LM Studio', 'Hugging Face', 'Unsloth', 'PyTorch', 'QLoRA fine-tuning'],
  },
  {
    category: 'DATA / VECTOR',
    items: ['PostgreSQL', 'MongoDB', 'Qdrant', 'Chroma', 'FAISS'],
  },
  {
    category: 'FRONTEND / APPS',
    items: ['React', 'Next.js', 'Streamlit', 'TailwindCSS', 'Node.js'],
  },
  {
    category: 'INFRA / OPS',
    items: ['Docker', 'Git', 'GitLab', 'n8n', 'CI/CD', 'AWS', 'Azure', 'GCP'],
  },
] as const;

/**
 * Stats, counted from the GitHub API and the Ollama/HF profiles rather than
 * estimated: a visitor can check these, so they should be exactly true.
 */
export const stats = [
  { value: '30+', label: 'PUBLIC REPOS' },
  { value: '3', label: 'MODELS PUBLISHED' },
  { value: '2', label: 'CERTIFICATIONS' },
] as const;

/** Focus areas for the hero focus line. */
export const focusAreas = [
  'Agent harnesses',
  'LangGraph',
  'RAG',
  'fine-tuning',
  'Docker',
] as const;
