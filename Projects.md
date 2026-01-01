## S.A.R.A.H. – Smart Assistant Real At Heart  
**A Local Desktop Voice Assistant Powered by LLaMA 3.2 and LiveKit**  
*Jun 2025*

**S.A.R.A.H. (Smart Assistant Real At Heart)** — a fully local desktop voice assistant powered by a fine-tuned **LLaMA 3.2** model. It uses a real-time **STT → LLM → TTS** pipeline with **LiveKit** for voice streaming, **Deepgram** for speech-to-text, and **Cartesia AI** for natural voice responses.

S.A.R.A.H. can understand natural language commands and invoke tools like launching apps, reading emails, or organizing files — all while running **100% offline** for complete privacy. The assistant outputs structured tool calls for backend execution, making it fast, extensible, and cloud-free.

---

## Speaker Voice Separation with Dual-Path Transformers  
*Jun 2025 – Jun 2025*

Enhancing the **Dual-Path RNN** framework by replacing the original recurrent modules with **intra-chunk** and **inter-chunk Transformer** layers. This hybrid architecture aims to better capture both local and global audio dependencies for superior multi-speaker separation.

**Key Contributions:**
- **Intra-chunk Transformer:** Applies self-attention within small audio chunks to model fine-grained, short-term temporal features
- **Inter-chunk Transformer:** Captures long-range context by attending across chunk sequences, improving separation of overlapping speakers
- Combines chunk-wise processing with powerful Transformer attention mechanisms
- Implemented end-to-end with **PyTorch** for efficient training and inference
- Evaluated using standard metrics such as **SI-SNR** and **SDR**

---

## Assistive Sidewalk Segmentation: Fine-Tuning SAM 2.1 with a Custom Dataset for the Visually Impaired (Master Project)  
*May 2025 – Jun 2025*

Developed a comprehensive training and deployment pipeline for fine-tuning **Segment Anything Model (SAM) 2.1** by Meta on custom sidewalk imagery, aimed at enabling assistive vision systems for the visually impaired.

The project spans data preprocessing, dynamic prompt generation, mixed-precision training, checkpointing, and model evaluation, culminating in an interactive **Streamlit** application for real-time segmentation and inference.

**Key Features:**
- Seamless integration with **PyTorch** and **Hugging Face Accelerate** for scalable training
- YAML-based configuration system for flexible hyperparameter and component tuning
- Support for **FP16/BF16** precision with selective prompt encoder/decoder fine-tuning
- Built-in visual verification tools for prompt–mask overlay analysis
- Live demo app for real-time segmentation using point-based prompts

---

## 🤖 ogAI: Multi-Model LLM Discord Assistant  
*Apr 2025 – May 2025*

Built a fully customizable AI-powered Discord bot that integrates multiple local and cloud-based language models (e.g., **Ollama, Gemini, GPT-4**) to deliver intelligent, context-aware responses across diverse use cases including general Q&A, summarization, and creative tasks.

**Features:**
- Integrated multiple backends: **OpenAI GPT**, **Google Gemini**, and **Ollama** (Mistral, LLaMA, etc.)
- Flexible routing logic to dynamically select models based on task or user input
- Built with **discord.py** for command handling, async interaction, and modular plugin design
- Prompt templates, system messages, and conversation context tracking
- Efficient token usage and robust fallback mechanisms
- Privacy-aware, offline LLM usage via **Ollama**

*Ideal for testing, prototyping, or deploying multi-agent LLM systems in real-time environments.*
