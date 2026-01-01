# N8N-Framework: AI-Powered SysMLv2 Systems Engineering Platform

## Comprehensive Technical Report

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Project Overview](#project-overview)
3. [Technology Stack](#technology-stack)
4. [System Architecture](#system-architecture)
5. [Component Breakdown](#component-breakdown)
6. [Data Models & Workflows](#data-models--workflows)
7. [AI Agent System](#ai-agent-system)
8. [Service Endpoints](#service-endpoints)
9. [Database Schema](#database-schema)
10. [Setup & Installation](#setup--installation)
11. [Project Directory Structure](#project-directory-structure)
12. [Key Features & Capabilities](#key-features--capabilities)
13. [Integration Points](#integration-points)
14. [Development Workflow](#development-workflow)
15. [Security Considerations](#security-considerations)
16. [Future Enhancements](#future-enhancements)

---

## 1. Executive Summary

The **N8N-Framework** is an advanced, AI-powered systems engineering platform that integrates **SysMLv2 (Systems Modeling Language v2)** with multi-agent Large Language Models (LLMs) to assist in designing, modeling, analyzing, and optimizing complex systems. Built on the n8n workflow automation platform, this framework provides a comprehensive ecosystem for systems engineers to leverage AI assistance while maintaining rigorous validation and compliance with SysMLv2 standards.

### Core Value Proposition

- **AI-Driven Code Generation**: LLM-powered agents generate validated SysMLv2 code from natural language
- **Multi-Agent Analysis**: Specialized agents for KPI analysis, solution generation, and optimization
- **Rigorous Validation**: Zero-tolerance syntax validation using ANTLR4-based parsers
- **Visual Modeling**: Integration with Eclipse SysON for professional SysML editing
- **Workflow Automation**: n8n orchestrates all backend operations and data persistence
- **Knowledge Integration**: Domain documents feed into analysis and code generation

### Target Users

- Systems Engineers
- Model-Based Systems Engineering (MBSE) Practitioners
- Solution Architects
- Research Teams in Systems Design
- Educational Institutions teaching SysMLv2

---

## 2. Project Overview

### 2.1 Purpose

This framework addresses the challenge of creating valid, production-ready SysMLv2 models by:

1. **Automating Code Generation**: Reducing manual coding effort through AI assistance
2. **Ensuring Correctness**: Enforcing strict validation before code acceptance
3. **Supporting Analysis**: Providing KPI-based evaluation of design alternatives
4. **Enabling Exploration**: Generating multiple solution alternatives for comparison
5. **Facilitating Collaboration**: Web-based interface accessible from anywhere

### 2.2 Problem Domain

**Systems Modeling Language v2 (SysMLv2)** is a complex, precision modeling language for systems engineering. It requires:

- Deep understanding of syntax rules
- Proper scoping and declaration order
- Complete attribute definitions (no partial declarations)
- Correct use of constraints, redefinitions, and specializations
- Integration with measurement units and standard libraries

Manual creation of SysMLv2 models is:
- Time-consuming
- Error-prone
- Requires extensive training
- Difficult to validate without specialized tools

### 2.3 Solution Approach

The framework combines:

1. **LLM Agents**: Leverage AI models (Ollama Cloud, OpenAI, Claude) for code generation
2. **Validation Tools**: ANTLR4-generated parsers for SysMLv2/KerMLv2 syntax checking
3. **Workflow Orchestration**: n8n workflows manage data flow and agent invocations
4. **Web Interface**: Next.js application provides user-friendly access
5. **Visual Editor**: Eclipse SysON integration for graphical modeling
6. **Knowledge Base**: Document storage and semantic search for domain knowledge

---

## 3. Technology Stack

### 3.1 Frontend Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 15.3.5 | React framework with App Router |
| **React** | 19.0.0 | UI component library |
| **TypeScript** | 5.x | Type-safe JavaScript |
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **Radix UI** | Various | Accessible component primitives |
| **ReactFlow** | 11.11.4 | Workflow/diagram visualization |
| **Framer Motion** | 12.23.24 | Animation library |
| **React Markdown** | 10.1.0 | Markdown rendering |
| **React Syntax Highlighter** | 15.6.6 | Code syntax highlighting |
| **TanStack Query** | 5.83.0 | Data fetching and caching |
| **Lucide React** | 0.525.0 | Icon library |
| **Tabler Icons** | 3.34.0 | Additional icon set |

### 3.2 Backend Technologies

#### Python Services

| Technology | Version | Purpose |
|-----------|---------|---------|
| **FastAPI** | 0.119.0 | High-performance API framework |
| **LangChain** | 1.0.3 | LLM orchestration framework |
| **LangGraph** | 1.0.2 | Graph-based agent workflows |
| **LangSmith** | 0.4.40 | LLM observability and tracing |
| **Ollama** | 0.6.0 | Local/cloud LLM interface |
| **Pydantic** | 2.12.2 | Data validation and settings |
| **ANTLR4 Runtime** | 4.13.2 | Parser runtime for SysMLv2/KerMLv2 |
| **Uvicorn** | 0.37.0 | ASGI server |
| **httpx** | 0.28.1 | Async HTTP client |

#### Workflow & Automation

| Technology | Version | Purpose |
|-----------|---------|---------|
| **n8n** | Latest | Workflow automation platform |
| **PostgreSQL** | Latest (2 instances) | Relational database |
| **MinIO** | RELEASE.2025-04-22T22-12-26Z | S3-compatible object storage |
| **Qdrant** | Cloud | Vector database for embeddings |

#### Visualization & Modeling

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Eclipse SysON** | v2025.8.0 | SysMLv2 graphical editor |
| **Spring Boot** | (via SysON) | SysON backend framework |
| **GraphQL** | (via SysON) | SysON API interface |

### 3.3 AI/ML Technologies

| Technology | Purpose |
|-----------|---------|
| **gpt-oss:120b** | General-purpose reasoning |
| **qwen3-coder:480b-cloud** | Code generation (primary) |
| **Babitdor/Qwen2.5-Coder-SysMLv2** | SysMLv2-specialized model |
| **nomic-embed-text** | Text embeddings for knowledge search |
| **OpenAI API** | Optional LLM provider |
| **Anthropic Claude** | Optional LLM provider |

### 3.4 DevOps & Infrastructure

| Technology | Purpose |
|-----------|---------|
| **Docker** | Containerization |
| **Docker Compose** | Multi-container orchestration |
| **Node.js** | JavaScript runtime (Next.js) |
| **Python 3.11+** | Backend runtime |
| **Git** | Version control |

### 3.5 External Services

| Service | Purpose |
|---------|---------|
| **Ollama Cloud** | Free-tier LLM hosting |
| **LangSmith** | LLM tracing and monitoring |
| **Qdrant Cloud** | Vector database hosting |
| **SerpAPI** | Search engine integration |

---

## 4. System Architecture

### 4.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│                    (Browser @ localhost:3000)                   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND LAYER                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Next.js App (communication-app:3000)                    │  │
│  │  - Dashboard, Projects, Workflow Canvas                  │  │
│  │  - SysML IDE, Knowledge Base, Solutions                  │  │
│  │  - Service Clients (API Communication)                   │  │
│  └────────────────────┬─────────────────────────────────────┘  │
└─────────────────────────┼────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   WORKFLOW ORCHESTRATION LAYER                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  n8n (llm-se-n8n:5678)                                   │  │
│  │  ┌────────────┐  ┌──────────────┐  ┌─────────────────┐  │  │
│  │  │ Solutions  │  │ SolutionSpcs │  │   Functions     │  │  │
│  │  │ Workflow   │  │   Workflow   │  │   Workflow      │  │  │
│  │  └────────────┘  └──────────────┘  └─────────────────┘  │  │
│  │  ┌────────────┐  ┌──────────────┐  ┌─────────────────┐  │  │
│  │  │  Options   │  │     KPIs     │  │   Knowledge     │  │  │
│  │  │  Workflow  │  │   Workflow   │  │   Workflow      │  │  │
│  │  └────────────┘  └──────────────┘  └─────────────────┘  │  │
│  │  ┌────────────┐  ┌──────────────┐  ┌─────────────────┐  │  │
│  │  │KPI-Analyst │  │ SysML-Expert │  │   MA-Solver     │  │  │
│  │  │ (Agent)    │  │   (Agent)    │  │   (Agent)       │  │  │
│  │  └────────────┘  └──────────────┘  └─────────────────┘  │  │
│  │  ┌────────────┐  ┌──────────────┐                       │  │
│  │  │MA-Optimizer│  │  IDE-Agent   │                       │  │
│  │  │  (Agent)   │  │   (Agent)    │                       │  │
│  │  └────────────┘  └──────────────┘                       │  │
│  └────────────────────┬─────────────────────────────────────┘  │
└─────────────────────────┼────────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
┌─────────────────┐ ┌─────────────┐ ┌──────────────────┐
│  AGENT LAYER    │ │ PARSER API  │ │  VISUALIZATION   │
│  SysML Agent    │ │ Validator   │ │  SysON Service   │
│  (port 8100)    │ │ (port 8000) │ │  (port 8010)     │
└────────┬────────┘ └──────┬──────┘ └────────┬─────────┘
         │                 │                 │
         │                 │                 ▼
         │                 │         ┌──────────────────┐
         │                 │         │  Eclipse SysON   │
         │                 │         │  (port 8080)     │
         │                 │         └────────┬─────────┘
         │                 │                  │
         ▼                 ▼                  ▼
┌─────────────────────────────────────────────────────────┐
│                    DATA LAYER                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ PostgreSQL   │  │ PostgreSQL   │  │    MinIO     │ │
│  │ (SysON DB)   │  │  (n8n DB)    │  │  (S3 Files)  │ │
│  │ Port 5432    │  │  Port 5433   │  │  Port 9000   │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│  ┌──────────────┐                                      │
│  │   Qdrant     │                                      │
│  │  (Vectors)   │                                      │
│  │   Cloud      │                                      │
│  └──────────────┘                                      │
└─────────────────────────────────────────────────────────┘
```

### 4.2 Microservices Architecture

The system follows a **microservices pattern** with the following services:

1. **communication-app** (Next.js Frontend)
2. **llm-se-n8n** (Workflow Engine)
3. **llm-se-sysml-agent** (AI Agent System)
4. **llm-se-parser** (Syntax Validator)
5. **llm-se-visualize** (SysON Bridge)
6. **llm-se-syson** (Visual Editor)
7. **llm-se-postgres-syson** (SysON Database)
8. **llm-se-postgres-n8n** (Workflow Database)
9. **llm-se-minio** (File Storage)

All services communicate over a shared **app-network** Docker bridge network.

### 4.3 Communication Flow

```
User Action (Frontend)
    ↓
Service Client (TypeScript)
    ↓
n8n Webhook Endpoint
    ↓
Workflow Execution (n8n)
    ↓
    ├─→ Database Query (PostgreSQL)
    ├─→ Agent Invocation (HTTP to SysML Agent API)
    ├─→ File Storage (MinIO S3)
    └─→ Vector Search (Qdrant)
    ↓
Response Processing
    ↓
JSON Response to Frontend
    ↓
UI Update (React State)
```

---

## 5. Component Breakdown

### 5.1 Frontend Components (Next.js App)

#### Page Structure

```
app/
├── page.tsx                    # Dashboard (KPIs, stats)
├── projects/page.tsx           # Solution Space Management
├── knowledge-base/page.tsx     # Knowledge Repository
├── workflow/page.tsx           # ReactFlow Workflow Canvas
├── ide/page.tsx                # SysML IDE with AI Assistant
├── solutions/page.tsx          # Solution List
├── solution/page.tsx           # Individual Solution Details
└── result/page.tsx             # Solution Analysis & Results
```

#### Key Components

**Sidebar Navigation** (`app/components/Sidebar.tsx`)
- Collapsible sidebar with navigation links
- Active route highlighting
- Project context display

**Workflow Canvas** (`app/workflow/page.tsx`)
- ReactFlow-based visual editor
- Custom node types:
  - `FunctionNode.tsx`
  - `OptionNode.tsx`
  - `KnowledgeBaseNode.tsx`
  - `SolutionSpaceNode.tsx`
- Connection validation rules
- Drag-and-drop functionality
- Canvas state persistence (localStorage)

**SysML IDE Components**
- Code editor with syntax highlighting
- Chat panel for AI interaction
- Message rendering with markdown support
- Undo/redo history management

**Modals**
- Knowledge Base selection modal
- Confirmation dialogs (Radix UI Alert Dialog)

#### Service Clients (`app/services/`)

All frontend services communicate with n8n webhooks:

| Service File | Purpose | Webhook Endpoint |
|-------------|---------|------------------|
| `Solutions.ts` | Solution CRUD operations | `/webhook/solutions` |
| `SolutionSpaces.ts` | Project management | `/webhook/solution-spaces` |
| `Functions.ts` | Function definitions | `/webhook/functions` |
| `Options.ts` | Option alternatives | `/webhook/options` |
| `KPI.ts` | KPI management | `/webhook/kpis` |
| `Knowledge.ts` | Knowledge documents | `/webhook/knowledge-items` |
| `AgentCalls.ts` | AI agent invocations | `/webhook/agents/*` |
| `SysIDE.ts` | IDE assistant | `/webhook/ide-agent` |

### 5.2 Backend Services

#### n8n Workflows

Located in `n8n-workflows/`, these JSON files define workflow automation:

| Workflow | Purpose | Key Operations |
|----------|---------|----------------|
| `Solutions.json` | Manage solutions | Create, Read, Update, Delete, List |
| `SolutionSpaces.json` | Manage projects | CRUD + cascade delete |
| `Functions.json` | Function management | CRUD operations |
| `Options.json` | Option management | CRUD + knowledge linking |
| `KPIs.json` | KPI tracking | Create, list, delete KPIs |
| `Knowledge_items.json` | Document storage | Upload to MinIO, vector embeddings |
| `SysML-Expert.json` | Code generation agent | Validate & generate SysML code |
| `KPI-Analyst.json` | KPI analysis agent | Evaluate solutions against KPIs |
| `MA-Solver.json` | Solution generator | Generate multiple alternatives |
| `MA-Optimizer.json` | Solution optimizer | Refine existing solutions |
| `IDE-Agent.json` | IDE assistant | Interactive chat support |

#### Python Services

**1. SysML Agent System** (`n8n-tools/`)

Main entry point: `SysML.py` (FastAPI server on port 8100)

```python
# Key endpoints
POST /generate          # Generate & validate SysML code
GET  /health           # Health check
```

**Agent Architecture:**

```
SysMLAgent
├── LLM: ChatOllama (qwen3-coder:480b-cloud)
├── Tools:
│   ├── SysML-validator-tool (validate syntax)
│   └── SysMLSyntaxTool (syntax reference lookup)
├── System Prompt: Comprehensive validation rules
└── Response Parser: Pydantic (SysMLResponse)
```

**Validation Workflow:**
1. User provides SysML template code
2. Agent searches for similar patterns (syntax DB)
3. Agent verifies syntax rules
4. Agent generates complete code
5. Agent validates using ANTLR4 parser
6. If errors: fix and re-validate (up to 5 attempts)
7. Return JSON with validated code or error report

**2. Parser API** (`scripts/parser-syson/ParserAPI.py`)

FastAPI service on port 8000:

```python
POST /validate          # Validate SysMLv2 code
POST /validate-kerml    # Validate KerMLv2 code
```

Uses ANTLR4-generated lexers and parsers:
- `LoggingParsers/SysMLv2/SysMLv2Lexer.py`
- `LoggingParsers/SysMLv2/SysMLv2Parser.py`
- `LoggingParsers/KerMLv2/KerMLv2Lexer.py`
- `LoggingParsers/KerMLv2/KerMLv2Parser.py`

Returns detailed error messages with line numbers and descriptions.

**3. SysON Visualization Service** (`scripts/parser-syson/SysON.py`)

FastAPI service on port 8010:

```python
POST /import            # Import SysML code to SysON
POST /visualize         # Visualize in SysON
```

Bridges to Eclipse SysON via GraphQL mutations:
- Parses SysML code into AST
- Generates GraphQL mutations
- Sends to SysON GraphQL endpoint
- Returns visualization URL

---

## 6. Data Models & Workflows

### 6.1 Core Data Model

```
┌─────────────────────────────────────────────────────────────┐
│                     SolutionSpace (Project)                 │
│  - id: string                                               │
│  - name: string                                             │
│  - description: string                                      │
│  - business_requirements: string                            │
│  - customer_requirements: string                            │
│  - created_at: timestamp                                    │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┬─────────────────┐
        │                │                │                 │
        ▼                ▼                ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────┐  ┌───────────────┐
│  Functions   │  │     KPIs     │  │Knowledge │  │   Solutions   │
│              │  │              │  │  Items   │  │               │
│ - id         │  │ - id         │  │          │  │ - id          │
│ - name       │  │ - name       │  │ - id     │  │ - name        │
│ - desc       │  │ - type       │  │ - name   │  │ - initial_res │
│ - sysml_code │  │ - target_val │  │ - file   │  │ - final_res   │
│ - sol_sp_id  │  │ - unit       │  │ - desc   │  │ - kpi_analysis│
│              │  │ - sol_sp_id  │  │          │  │ - sol_sp_id   │
└──────┬───────┘  └──────────────┘  └──────────┘  └───────────────┘
       │
       ▼
┌──────────────┐
│   Options    │
│              │
│ - id         │
│ - name       │
│ - desc       │
│ - sysml_code │
│ - function_id│
│ - knowledge  │◄──── Links to Knowledge Items
└──────────────┘
```

### 6.2 Workflow Hierarchy

```
1. User creates Solution Space
   ↓
2. User defines Functions (system capabilities)
   ↓
3. For each Function, user creates Options (alternatives)
   ↓
4. User attaches Knowledge documents to Options
   ↓
5. User defines KPIs (qualitative & quantitative metrics)
   ↓
6. User triggers Solution Generation (MA-Solver)
   ↓
7. System generates multiple Solutions with reasoning
   ↓
8. User selects Solution for analysis
   ↓
9. System runs KPI-Analyst on Solution
   ↓
10. System generates SysML code (SysML-Expert)
    ↓
11. User can optimize Solution (MA-Optimizer)
    ↓
12. User can visualize in SysON
```

### 6.3 Agent Invocation Flow

```
Frontend Request
    ↓
n8n Webhook (e.g., /webhook/agents/sysml-expert)
    ↓
n8n Workflow Execution
    ↓
Retrieve Context Data (Functions, Options, Knowledge)
    ↓
Construct Agent Prompt
    ↓
HTTP POST to Agent API (port 8100 or internal)
    ↓
Agent Processing:
    ├─ LLM generates response
    ├─ Validate with tools
    └─ Format output
    ↓
Return to n8n
    ↓
n8n stores result in PostgreSQL
    ↓
Response to Frontend
    ↓
UI displays result
```

---

## 7. AI Agent System

### 7.1 Agent Types

The framework employs **specialized agents** for different tasks:

#### 1. SysML-Expert Agent

**Purpose**: Generate and validate SysMLv2 code

**LLM**: `qwen3-coder:480b-cloud` (Ollama)

**Tools**:
- `SysML-validator-tool`: ANTLR4-based syntax validation
- `SysMLSyntaxTool`: Syntax reference from YAML database

**Workflow**:
1. Search for similar code patterns
2. Verify syntax rules
3. Generate complete code (no placeholders)
4. Validate with ANTLR4 parser
5. Loop until validation passes (max 5 attempts)
6. Return validated code or detailed error report

**Quality Gates**:
- All imports must have `public`/`private` keywords
- All attributes must have type AND value
- All constraints must have complete expressions
- No ellipsis, TODOs, or placeholders
- Zero syntax errors required

**Example Prompt:**
```
Generate SysML code for a vehicle with:
- Mass attribute (1200 kg)
- Speed attribute (initially 0)
- Constraint: mass must be <= 2000 kg
```

**Expected Output:**
```json
{
  "code": "public import ScalarValues::*;\npublic import ISQ::*;\npublic import SI::*;\n\npart def Vehicle {\n  attribute mass : MassValue = 1200.0 [kg];\n  attribute speed : Real = 0.0;\n  constraint massLimit { mass <= 2000.0 }\n}",
  "validated": true,
  "validation_attempts": 1,
  "final_validation_result": "No errors"
}
```

#### 2. KPI-Analyst Agent

**Purpose**: Evaluate solutions against Key Performance Indicators

**LLM**: Configurable (Ollama/OpenAI/Claude)

**Inputs**:
- Solution description
- List of KPIs (qualitative & quantitative)
- Domain knowledge documents

**Outputs**:
- Qualitative assessments (Low/Medium/High)
- Quantitative assessments (Hit/Miss)
- Confidence levels (0-100%)
- Detailed rationale for each assessment

**Example Analysis:**
```json
{
  "kpi_name": "Fuel Efficiency",
  "type": "quantitative",
  "target": "35 mpg",
  "assessment": "Hit",
  "confidence": 85,
  "rationale": "The hybrid powertrain design is expected to achieve 38 mpg based on similar configurations, exceeding the target."
}
```

#### 3. MA-Solver (Multi-Alternative Solver) Agent

**Purpose**: Generate multiple solution alternatives

**LLM**: Configurable

**Inputs**:
- Solution space requirements
- Available functions and options
- Knowledge documents
- KPIs for optimization

**Outputs**:
- Multiple solution alternatives (typically 3-5)
- Reasoning for each alternative
- Alignment scores against requirements
- Risk assessments
- Executive summaries

**Example Output:**
```json
{
  "alternatives": [
    {
      "name": "Solution A: Hybrid Approach",
      "description": "...",
      "selected_options": ["Option1", "Option3"],
      "reasoning": "Balances cost and performance...",
      "alignment_score": 0.92,
      "risks": ["Battery supply chain", "Higher initial cost"]
    },
    {
      "name": "Solution B: Pure Electric",
      "description": "...",
      "selected_options": ["Option2", "Option4"],
      "reasoning": "Maximizes environmental benefits...",
      "alignment_score": 0.88,
      "risks": ["Charging infrastructure", "Range anxiety"]
    }
  ],
  "executive_summary": "Two viable solutions identified..."
}
```

#### 4. MA-Optimizer Agent

**Purpose**: Refine and optimize existing solutions

**LLM**: Configurable

**Inputs**:
- Existing solution
- Optimization prompt (user-specified criteria)
- Available options
- KPIs

**Outputs**:
- Optimized solution
- Changes made
- Improvement rationale
- Updated KPI assessments

**Example Prompt:**
```
Optimize this solution to reduce cost by 15% while maintaining performance above 90% of current levels.
```

#### 5. IDE-Agent

**Purpose**: Interactive assistant for SysML IDE

**LLM**: Configurable

**Capabilities**:
- Answer SysMLv2 syntax questions
- Generate code snippets
- Explain modeling concepts
- Suggest improvements
- Debug syntax errors

**Example Interaction:**
```
User: How do I define a constraint that mass + cargo <= maxMass?

Agent: You can define this constraint within a part definition:

part def Vehicle {
  attribute mass : Real = 1200.0;
  attribute cargo : Real = 0.0;
  attribute maxMass : Real = 2000.0;

  constraint weightLimit {
    mass + cargo <= maxMass
  }
}

Make sure all attributes are declared before use in the constraint.
```

### 7.2 Agent Configuration

Agents are configured in `n8n-tools/prompt.yaml`:

```yaml
SysML-Agent: |
  You are a SysMLv2 modeling expert...
  [Comprehensive prompt with validation rules]
```

### 7.3 LangChain Integration

All agents use **LangChain** framework:

```python
from langchain_ollama import ChatOllama
from langchain.agents import create_agent
from langchain.agents.structured_output import ToolStrategy

agent = create_agent(
    name="SysMLAgent",
    model=ChatOllama(model="qwen3-coder:480b-cloud"),
    tools=[syntax_tool, sysml_validator_tool],
    system_prompt=system_prompt,
    response_format=ToolStrategy(SysMLResponse)
)

response = agent.invoke(
    {"messages": [{"role": "user", "content": prompt}]},
    {"recursion_limit": 100}
)
```

### 7.4 Observability

**LangSmith** integration provides:
- Trace all LLM calls
- Monitor token usage
- Debug agent reasoning
- Performance metrics
- Error tracking

Configure in `.env`:
```env
LANGSMITH_TRACING=true
LANGSMITH_ENDPOINT=https://api.smith.langchain.com
LANGSMITH_API_KEY=your_key
LANGSMITH_PROJECT=n8n-framework
```

---

## 8. Service Endpoints

### 8.1 Frontend (Next.js)

**Base URL**: `http://localhost:3000`

| Route | Purpose |
|-------|---------|
| `/` | Dashboard with statistics |
| `/projects` | Solution Space management |
| `/knowledge-base` | Knowledge repository |
| `/workflow` | Visual workflow canvas |
| `/ide` | SysML IDE with AI assistant |
| `/solutions` | List all solutions |
| `/solution?id={id}` | Solution details |
| `/result?id={id}` | Solution analysis results |

### 8.2 n8n Webhooks

**Base URL**: `http://localhost:5678/webhook`

#### Data Management Webhooks

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/solution-spaces` | GET | List all solution spaces |
| `/solution-spaces` | POST | Create solution space |
| `/solution-spaces/{id}` | GET | Get solution space by ID |
| `/solution-spaces/{id}` | PUT | Update solution space |
| `/solution-spaces/{id}` | DELETE | Delete solution space (cascade) |
| `/functions` | GET, POST | Manage functions |
| `/functions/{id}` | GET, PUT, DELETE | Function operations |
| `/options` | GET, POST | Manage options |
| `/options/{id}` | GET, PUT, DELETE | Option operations |
| `/kpis` | GET, POST | Manage KPIs |
| `/kpis/{id}` | DELETE | Delete KPI |
| `/solutions` | GET, POST | Manage solutions |
| `/solutions/{id}` | GET, PUT, DELETE | Solution operations |
| `/knowledge-items` | GET, POST | Upload & list documents |
| `/knowledge-items/{id}` | DELETE | Delete document |

#### Agent Webhooks

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/agents/sysml-expert` | POST | Generate SysML code |
| `/agents/kpi-analyst` | POST | Analyze solution KPIs |
| `/agents/ma-solver` | POST | Generate solution alternatives |
| `/agents/ma-optimizer` | POST | Optimize existing solution |
| `/agents/ide-agent` | POST | IDE chat assistant |

### 8.3 SysML Agent API

**Base URL**: `http://localhost:8100`

| Endpoint | Method | Request Body | Response |
|----------|--------|-------------|----------|
| `/` | GET | - | `{ "status": "online", "service": "SysML Agent API" }` |
| `/health` | GET | - | `{ "status": "healthy", "service": "SysML Agent API" }` |
| `/generate` | POST | `{ "code": "string" }` | `{ "success": bool, "code": "string", "validated": bool, "errors": [], "message": "string" }` |

### 8.4 Parser API

**Base URL**: `http://localhost:8000`

| Endpoint | Method | Request Body | Response |
|----------|--------|-------------|----------|
| `/validate` | POST | `{ "code": "string" }` | `{ "valid": bool, "errors": [], "warnings": [] }` |
| `/validate-kerml` | POST | `{ "code": "string" }` | `{ "valid": bool, "errors": [], "warnings": [] }` |

### 8.5 SysON Visualization

**Base URL**: `http://localhost:8010`

| Endpoint | Method | Request Body | Response |
|----------|--------|-------------|----------|
| `/import` | POST | `{ "code": "string", "project_id": "string" }` | `{ "success": bool, "message": "string" }` |
| `/visualize` | POST | `{ "code": "string" }` | `{ "url": "string" }` |

**SysON GraphQL**: `http://localhost:8080/api/graphql`

### 8.6 Database Connections

| Service | Host | Port | Database |
|---------|------|------|----------|
| SysON PostgreSQL | `postgres-syson` | 5432 | `${SYSON_DB_NAME}` |
| n8n PostgreSQL | `postgres-n8n` | 5433 (external) / 5432 (internal) | `${N8N_DB_NAME}` |
| MinIO S3 | `minio` | 9000 (API), 9001 (Console) | Buckets: `knowledge-docs` |
| Qdrant | Cloud | HTTPS | Collections: `knowledge-vectors` |

---

## 9. Database Schema

### 9.1 PostgreSQL (n8n Database)

#### solution_spaces Table
```sql
CREATE TABLE solution_spaces (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    business_requirements TEXT,
    customer_requirements TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### functions Table
```sql
CREATE TABLE functions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    sysml_code TEXT,
    solution_space_id INTEGER REFERENCES solution_spaces(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### options Table
```sql
CREATE TABLE options (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    sysml_code TEXT,
    function_id INTEGER REFERENCES functions(id) ON DELETE CASCADE,
    knowledge_items JSONB, -- Array of knowledge document IDs
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### kpis Table
```sql
CREATE TABLE kpis (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50), -- 'qualitative' or 'quantitative'
    description TEXT,
    target_value VARCHAR(255),
    unit VARCHAR(50),
    solution_space_id INTEGER REFERENCES solution_spaces(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### solutions Table
```sql
CREATE TABLE solutions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    initial_result JSONB, -- MA-Solver output
    final_result JSONB, -- MA-Optimizer output
    kpi_analysis JSONB, -- KPI-Analyst output
    sysml_code TEXT, -- SysML-Expert generated code
    solution_space_id INTEGER REFERENCES solution_spaces(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### knowledge_items Table
```sql
CREATE TABLE knowledge_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    file_path VARCHAR(500), -- MinIO S3 path
    file_size INTEGER,
    mime_type VARCHAR(100),
    vector_id VARCHAR(255), -- Qdrant vector ID
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 9.2 PostgreSQL (SysON Database)

Managed by Eclipse SysON. Schema includes:
- `projects`: SysON project metadata
- `representations`: Visual diagrams
- `semantic_data`: SysML model elements

### 9.3 MinIO (Object Storage)

**Buckets**:
- `knowledge-docs`: Stores uploaded documents (PDF, DOCX, TXT, MD)

**File Structure**:
```
knowledge-docs/
├── {document_id_1}.pdf
├── {document_id_2}.docx
├── {document_id_3}.txt
└── ...
```

### 9.4 Qdrant (Vector Database)

**Collections**:
- `knowledge-vectors`: Text embeddings of knowledge documents

**Vector Configuration**:
- **Model**: `nomic-embed-text`
- **Dimension**: 768 (typical for nomic-embed-text)
- **Distance Metric**: Cosine similarity

**Payload Schema**:
```json
{
  "document_id": "string",
  "document_name": "string",
  "chunk_text": "string",
  "chunk_index": "integer"
}
```

---

## 10. Setup & Installation

### 10.1 Prerequisites

1. **Docker & Docker Compose**
   - Docker Desktop (Windows/Mac) or Docker Engine (Linux)
   - Minimum 8GB RAM allocated to Docker
   - 20GB free disk space

2. **Ollama** (if using Ollama LLMs)
   - Install from https://ollama.com/
   - Create Ollama Cloud account
   - Pull required models:
     ```bash
     ollama pull gpt-oss:120b
     ollama pull qwen3-coder:480b-cloud
     ollama pull Babitdor/Qwen2.5-Coder-SysMLv2
     ollama pull nomic-embed-text
     ```

3. **External Services**
   - **LangSmith** account (for LLM tracing)
   - **Qdrant Cloud** account (for vector database)
   - **SerpAPI** account (optional, for search integration)

### 10.2 Installation Steps

#### Step 1: Clone Repository

```bash
git clone <repository-url>
cd N8N-Framework
```

#### Step 2: Configure Environment

```bash
# Copy template
cp .env.template .env

# Edit .env with your credentials
```

**Required `.env` variables:**

```env
# Database Credentials
SYSON_DB_NAME=syson_db
SYSON_DB_USER=syson_user
SYSON_DB_PASSWORD=your_secure_password

N8N_DB_NAME=n8n_db
N8N_DB_USER=n8n_user
N8N_DB_PASSWORD=your_secure_password

# MinIO (S3 Storage)
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=your_secure_password

# SysON Configuration (fill after SysON setup)
PROJECT_ID=
NAMESPACE_ELEMENT_ID=

# LangSmith (Observability)
LANGSMITH_TRACING=true
LANGSMITH_ENDPOINT=https://api.smith.langchain.com
LANGSMITH_API_KEY=your_langsmith_key
LANGSMITH_PROJECT=n8n-framework

# Ollama (if using)
OLLAMA_HOST=http://host.docker.internal:11434

# SerpAPI (optional)
SERPAPI_KEY=your_serpapi_key
```

#### Step 3: Build and Start Services

```bash
# Build all containers
docker compose up -d --build

# Verify all containers are running
docker ps
```

**Expected containers:**
- `llm-se-app` (Next.js)
- `llm-se-n8n` (n8n)
- `llm-se-sysml-agent` (Python agent)
- `llm-se-parser` (Parser API)
- `llm-se-visualize` (SysON bridge)
- `llm-se-syson` (Eclipse SysON)
- `llm-se-postgres-syson` (PostgreSQL)
- `llm-se-postgres-n8n` (PostgreSQL)
- `llm-se-minio` (MinIO)

#### Step 4: Setup n8n

1. Access n8n: http://localhost:5678
2. Create an account and login
3. Import workflows from `n8n-workflows/` folder:
   - Click "+ Add workflow" → "Import from file"
   - Import each `.json` file one by one
   - Name workflows matching their filenames
4. **Activate all workflows** (toggle in top-right corner)

#### Step 5: Configure n8n Credentials

**1. Ollama Credentials** (if using Ollama)
- Go to Credentials → Add Credential → Ollama
- Base URL: `http://host.docker.internal:11434`
- Save

**2. OpenAI/Claude** (if using alternative LLMs)
- Add respective credentials
- Replace Ollama nodes in workflows with OpenAI/Claude nodes

**3. Qdrant Credentials**
- Install Qdrant community node:
  - Settings → Community Nodes → Install
  - Package: `n8n-nodes-qdrant`
- Add Credential → Qdrant
- URL: Your Qdrant cloud endpoint
- API Key: Your Qdrant API key

**4. S3 (MinIO) Credentials**
- Access MinIO Console: http://localhost:9001
- Login with `MINIO_ROOT_USER` and `MINIO_ROOT_PASSWORD`
- Create Access Key → Copy Access Key ID and Secret
- In n8n:
  - Add Credential → S3
  - Endpoint: `http://host.docker.internal:9000`
  - Access Key ID: (from MinIO)
  - Secret Access Key: (from MinIO)
  - Enable "Force Path Style"
  - Region: `us-east-1`

**5. PostgreSQL Credentials**
- Add Credential → Postgres
- Host: `postgres-n8n`
- Database: `${N8N_DB_NAME}`
- User: `${N8N_DB_USER}`
- Password: `${N8N_DB_PASSWORD}`
- Port: `5432`

**6. SerpAPI** (optional)
- Add Credential → SerpAPI
- API Key: Your SerpAPI key

#### Step 6: Configure SysON

1. Access SysON: http://localhost:8080
2. Create a new project (SysMLv2 type)
3. Inside the project:
   - Left panel: Click "Package 1"
   - Right panel: Copy "Element ID" → Paste in `.env` as `NAMESPACE_ELEMENT_ID`
4. Share the project:
   - Click three dots on header → "Share"
   - Copy project ID from shareable URL → Paste in `.env` as `PROJECT_ID`
5. Restart `llm-se-visualize` container:
   ```bash
   docker restart llm-se-visualize
   ```

#### Step 7: Access the Framework

- **Frontend**: http://localhost:3000
- **n8n**: http://localhost:5678
- **SysON**: http://localhost:8080
- **MinIO Console**: http://localhost:9001

### 10.3 Verification

1. **Check Dashboard**: Visit http://localhost:3000 - should load without errors
2. **Test Workflow**: Create a test solution space
3. **Verify Agent**: Generate SysML code via IDE
4. **Check Storage**: Upload a knowledge document

---

## 11. Project Directory Structure

```
N8N-Framework/
├── app/                           # Next.js Frontend Application
│   ├── app/                       # App Router (Next.js 13+)
│   │   ├── components/            # Reusable UI Components
│   │   │   └── Sidebar.tsx        # Navigation sidebar
│   │   ├── ide/                   # SysML IDE Pages
│   │   │   └── page.tsx           # IDE interface
│   │   ├── projects/              # Project Management
│   │   │   └── page.tsx           # Solution spaces list
│   │   ├── knowledge-base/        # Knowledge Repository
│   │   │   └── page.tsx           # Document management
│   │   ├── workflow/              # Workflow Canvas
│   │   │   ├── page.tsx           # ReactFlow canvas
│   │   │   └── components/        # Workflow node components
│   │   │       ├── FunctionNode.tsx
│   │   │       ├── OptionNode.tsx
│   │   │       ├── KnowledgeBaseNode.tsx
│   │   │       └── KnowledgeBaseModal.tsx
│   │   ├── solutions/             # Solution List
│   │   │   └── page.tsx
│   │   ├── solution/              # Solution Details
│   │   │   └── page.tsx
│   │   ├── result/                # Solution Analysis
│   │   │   └── page.tsx
│   │   ├── services/              # API Service Clients
│   │   │   ├── SolutionSpaces.ts  # Solution space API
│   │   │   ├── Functions.ts       # Functions API
│   │   │   ├── Options.ts         # Options API
│   │   │   ├── KPI.ts             # KPI API
│   │   │   ├── Knowledge.ts       # Knowledge API
│   │   │   ├── Solutions.ts       # Solutions API
│   │   │   ├── AgentCalls.ts      # Agent invocation
│   │   │   └── SysIDE.ts          # IDE agent
│   │   ├── types/                 # TypeScript Type Definitions
│   │   │   ├── SolutionSpaces.tsx
│   │   │   ├── KPIs.tsx
│   │   │   └── ...
│   │   ├── globals.css            # Global styles
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Dashboard
│   ├── public/                    # Static Assets
│   │   ├── logo.png
│   │   └── logo.svg
│   ├── package.json               # Frontend dependencies
│   ├── tsconfig.json              # TypeScript config
│   ├── tailwind.config.js         # Tailwind CSS config
│   └── Dockerfile                 # Frontend container build
│
├── n8n-tools/                     # Python Agent System
│   ├── agent/                     # Agent Implementation
│   │   ├── SysMLAgent.py          # Main SysML agent class
│   │   └── tools/                 # Agent Tools
│   │       ├── SysMLValidatorTool.py    # Syntax validator
│   │       ├── SysMLSyntaxTool.py       # Syntax reference
│   │       ├── db/                      # Syntax database
│   │       │   └── syntax_db.yaml
│   │       └── sysml_parser/            # ANTLR4 Parsers
│   │           └── LoggingParsers/
│   │               ├── SysMLv2/
│   │               │   ├── SysMLv2Lexer.py
│   │               │   ├── SysMLv2Parser.py
│   │               │   └── SysMLv2Listener.py
│   │               ├── KerMLv2/
│   │               │   ├── KerMLv2Lexer.py
│   │               │   ├── KerMLv2Parser.py
│   │               │   └── KerMLv2Listener.py
│   │               ├── SysMLv2LoggingParser.py
│   │               └── KerMLv2LoggingParser.py
│   ├── states/                    # Agent State Models
│   │   └── SysMLResponse.py       # Response schema
│   ├── SysML.py                   # FastAPI Server (port 8100)
│   ├── prompt.yaml                # Agent prompts
│   ├── requirements.txt           # Python dependencies
│   └── Dockerfile                 # Agent container build
│
├── n8n-workflows/                 # n8n Workflow Definitions
│   ├── SolutionSpaces.json        # Solution space CRUD
│   ├── Functions.json             # Functions CRUD
│   ├── Options.json               # Options CRUD
│   ├── KPIs.json                  # KPI management
│   ├── Solutions.json             # Solutions CRUD
│   ├── Knowledge_items.json       # Document management
│   ├── SysML-Expert.json          # SysML code generation
│   ├── KPI-Analyst.json           # KPI analysis agent
│   ├── MA-Solver.json             # Solution generation
│   ├── MA-Optimizer.json          # Solution optimization
│   ├── IDE-Agent.json             # IDE assistant
│   └── DatabaseCreation.json      # Database initialization
│
├── scripts/                       # Parser & Visualization Services
│   └── parser-syson/
│       ├── ParserAPI.py           # Parser API (port 8000)
│       ├── SysON.py               # SysON bridge (port 8010)
│       ├── LoggingParsers/        # ANTLR4 parsers
│       │   ├── SysMLv2/
│       │   ├── KerMLv2/
│       │   ├── SysMLv2LoggingParser.py
│       │   └── ErrorLogger.py
│       ├── requirements.txt       # Parser dependencies
│       ├── Dockerfile.parser      # Parser container
│       └── Dockerfile.syson       # SysON container
│
├── assets/                        # Documentation Assets
│   ├── login.png
│   ├── create.png
│   ├── import_workflow.png
│   ├── activate.png
│   ├── credentials.png
│   ├── ollama.png
│   ├── qdrant.png
│   ├── minio.png
│   ├── s3.png
│   ├── postgres.png
│   ├── docker.png
│   ├── syson-1.png
│   └── syson-2.png
│
├── docker-compose.yml             # Container Orchestration
├── init-multiple-databases.sh     # Database Initialization Script
├── .env.template                  # Environment Variable Template
├── .env                           # Environment Variables (not in Git)
├── README.md                      # Setup Documentation
└── Report.md                      # This Comprehensive Report
```

---

## 12. Key Features & Capabilities

### 12.1 Solution Space Management

- **Create Projects**: Define solution spaces with business/customer requirements
- **Hierarchical Structure**: Organize functions, options, and knowledge
- **Cascade Delete**: Automatic cleanup of related entities
- **Visual Workflow**: ReactFlow canvas for visual organization

### 12.2 Multi-Agent AI System

#### SysML Code Generation
- **Natural Language to Code**: Convert descriptions to valid SysMLv2
- **Strict Validation**: ANTLR4-based syntax checking
- **Auto-Correction**: Agent self-corrects up to 5 attempts
- **Quality Assurance**: Zero syntax errors guaranteed

#### Solution Analysis
- **KPI Evaluation**: Assess solutions against metrics
- **Multi-Criteria Decision Making**: Compare alternatives
- **Risk Assessment**: Identify potential issues
- **Confidence Scoring**: Quantify assessment certainty

#### Alternative Generation
- **Automated Exploration**: Generate 3-5 alternatives automatically
- **Reasoning Documentation**: Explain each design choice
- **Alignment Scoring**: Measure fit to requirements
- **Trade-off Analysis**: Compare pros/cons

### 12.3 Knowledge Management

- **Document Upload**: PDF, DOCX, TXT, MD support (up to 20MB)
- **Vector Embeddings**: Semantic search with Qdrant
- **Knowledge Linking**: Attach documents to options
- **Context Retrieval**: Feed relevant knowledge to agents

### 12.4 Interactive IDE

- **Code Editor**: Syntax-highlighted SysML editing
- **AI Assistant**: Chat-based help and code generation
- **Undo/Redo**: Full history tracking
- **Save & Load**: Persist code to solutions
- **Visualization**: Send to SysON for graphical view

### 12.5 Visual Workflow Canvas

- **Drag-and-Drop**: Intuitive node placement
- **Connection Validation**: Enforce proper hierarchy
- **Real-Time Updates**: Auto-sync with database
- **Custom Nodes**: Function, Option, Knowledge, SolutionSpace

### 12.6 KPI Tracking

- **Qualitative Metrics**: Low/Medium/High assessments
- **Quantitative Metrics**: Hit/Miss against targets
- **Unit Support**: Define measurement units
- **Solution Alignment**: Automatic scoring

### 12.7 Integration Capabilities

- **n8n Webhooks**: RESTful API endpoints
- **GraphQL**: SysON integration
- **S3-Compatible Storage**: MinIO for files
- **Vector Database**: Qdrant for embeddings
- **LLM Providers**: Ollama, OpenAI, Claude, etc.

---

## 13. Integration Points

### 13.1 Frontend ↔ n8n

**Protocol**: HTTP/HTTPS (Fetch API)

**Pattern**: Service clients call n8n webhooks

```typescript
// Example: app/services/Solutions.ts
export async function createSolution(data: Solution) {
  const response = await fetch('http://localhost:5678/webhook/solutions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
}
```

### 13.2 n8n ↔ PostgreSQL

**Protocol**: PostgreSQL wire protocol

**Pattern**: Direct SQL queries via n8n Postgres node

```javascript
// n8n Postgres node
SELECT * FROM solution_spaces WHERE id = {{ $json.id }}
```

### 13.3 n8n ↔ SysML Agent

**Protocol**: HTTP (RESTful)

**Pattern**: HTTP Request node calls FastAPI endpoint

```javascript
// n8n HTTP Request node
POST http://llm-se-sysml-agent:8100/generate
{
  "code": "{{ $json.template_code }}"
}
```

### 13.4 SysML Agent ↔ Ollama

**Protocol**: HTTP (Ollama API)

**Pattern**: LangChain Ollama integration

```python
from langchain_ollama import ChatOllama

llm = ChatOllama(
    model="qwen3-coder:480b-cloud",
    base_url="http://host.docker.internal:11434"
)
```

### 13.5 n8n ↔ MinIO

**Protocol**: S3 API (HTTP)

**Pattern**: S3 node with MinIO endpoint

```javascript
// n8n S3 Upload node
Bucket: knowledge-docs
Endpoint: http://host.docker.internal:9000
File: {{ $binary.data }}
```

### 13.6 n8n ↔ Qdrant

**Protocol**: HTTP (Qdrant API)

**Pattern**: Qdrant community node

```javascript
// n8n Qdrant Insert node
Collection: knowledge-vectors
Vector: {{ $json.embedding }}
Payload: { document_id, chunk_text }
```

### 13.7 SysON Bridge ↔ Eclipse SysON

**Protocol**: GraphQL over HTTP

**Pattern**: GraphQL mutations for model import

```python
# SysON.py
mutation = """
mutation ImportModel($projectId: ID!, $modelData: String!) {
  importSysMLv2(projectId: $projectId, modelData: $modelData) {
    success
  }
}
"""
```

---

## 14. Development Workflow

### 14.1 Adding a New Feature

**Example: Add "Requirements" entity**

1. **Frontend Service**:
   ```typescript
   // app/services/Requirements.ts
   export async function getRequirements() {
     return fetch('http://localhost:5678/webhook/requirements').then(r => r.json());
   }
   ```

2. **n8n Workflow**:
   - Create `Requirements.json` workflow
   - Add Webhook Trigger node
   - Add Postgres node for database operations
   - Export and import to n8n

3. **Database Migration**:
   ```sql
   CREATE TABLE requirements (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255),
     description TEXT,
     solution_space_id INTEGER REFERENCES solution_spaces(id)
   );
   ```

4. **Frontend Page**:
   ```tsx
   // app/requirements/page.tsx
   export default function RequirementsPage() {
     const [requirements, setRequirements] = useState([]);
     // Fetch and display requirements
   }
   ```

### 14.2 Modifying Agent Behavior

1. **Update Prompt** (`n8n-tools/prompt.yaml`):
   ```yaml
   SysML-Agent: |
     [New instructions...]
   ```

2. **Add Tools** (if needed):
   ```python
   # n8n-tools/agent/tools/NewTool.py
   from langchain.tools import tool

   @tool
   def new_tool(query: str) -> str:
       """Tool description"""
       return result
   ```

3. **Update Agent** (`n8n-tools/agent/SysMLAgent.py`):
   ```python
   from agent.tools.NewTool import new_tool

   agent = create_agent(
       tools=[syntax_tool, sysml_validator_tool, new_tool],
       # ...
   )
   ```

4. **Rebuild Container**:
   ```bash
   docker compose up -d --build llm-se-sysml-agent
   ```

### 14.3 Adding a New Workflow Node

1. **Create Component**:
   ```tsx
   // app/workflow/components/RequirementNode.tsx
   import { Handle, Position } from 'reactflow';

   export function RequirementNode({ data }) {
     return (
       <div className="requirement-node">
         <Handle type="target" position={Position.Top} />
         {data.label}
         <Handle type="source" position={Position.Bottom} />
       </div>
     );
   }
   ```

2. **Register Node Type**:
   ```tsx
   // app/workflow/page.tsx
   const nodeTypes = {
     function: FunctionNode,
     option: OptionNode,
     requirement: RequirementNode, // New
   };
   ```

3. **Add Creation Logic**:
   ```tsx
   function addRequirementNode(data) {
     const newNode = {
       id: `requirement-${Date.now()}`,
       type: 'requirement',
       data,
       position: { x: 100, y: 100 }
     };
     setNodes([...nodes, newNode]);
   }
   ```

### 14.4 Testing

#### Manual Testing
1. Start services: `docker compose up -d`
2. Access frontend: http://localhost:3000
3. Test feature end-to-end

#### API Testing (Postman/curl)
```bash
# Test solution space creation
curl -X POST http://localhost:5678/webhook/solution-spaces \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Project", "description": "Test"}'
```

#### Agent Testing
```bash
# Test SysML code generation
curl -X POST http://localhost:8100/generate \
  -H "Content-Type: application/json" \
  -d '{"code": "part def Vehicle { }"}'
```

---

## 15. Security Considerations

### 15.1 Current Security Posture

⚠️ **Development Environment**: This configuration is for development/research use.

**Known Issues**:
- n8n CORS allows all origins (`*`)
- No authentication on n8n webhooks
- Hardcoded credentials in docker-compose
- MinIO with default credentials
- No HTTPS/TLS encryption

### 15.2 Production Hardening Recommendations

#### Authentication & Authorization

1. **n8n Webhook Authentication**:
   ```javascript
   // Add API key validation in n8n workflows
   IF {{ $json.headers.authorization }} !== "Bearer YOUR_SECRET_KEY"
   THEN return 401 Unauthorized
   ```

2. **Frontend Authentication**:
   - Implement NextAuth.js
   - Add user roles (admin, engineer, viewer)
   - Protect routes with middleware

3. **Database Access**:
   - Create separate users with minimal privileges
   - Use connection pooling with limits

#### Network Security

1. **Reverse Proxy** (Nginx/Traefik):
   ```nginx
   server {
     listen 443 ssl;
     server_name yourdomain.com;

     ssl_certificate /path/to/cert.pem;
     ssl_certificate_key /path/to/key.pem;

     location / {
       proxy_pass http://localhost:3000;
     }
   }
   ```

2. **Internal Network Isolation**:
   - Move databases to internal-only network
   - Only expose frontend, n8n through reverse proxy

3. **API Rate Limiting**:
   - Implement rate limits on webhooks
   - Use Redis for distributed rate limiting

#### Data Protection

1. **Secrets Management**:
   - Use Docker secrets or HashiCorp Vault
   - Never commit `.env` to Git
   - Rotate credentials regularly

2. **Encryption**:
   - Enable PostgreSQL SSL
   - Use HTTPS for all external communication
   - Encrypt MinIO data at rest

3. **Input Validation**:
   - Sanitize all user inputs
   - Validate file uploads (type, size)
   - Prevent SQL injection in n8n queries

#### Monitoring & Auditing

1. **Logging**:
   - Centralized logging (ELK stack)
   - Log all API requests
   - Audit trail for model changes

2. **Monitoring**:
   - Prometheus + Grafana
   - Alert on anomalies
   - Track resource usage

3. **LLM Security**:
   - Monitor token usage (cost control)
   - Prevent prompt injection attacks
   - Rate limit agent calls per user

---

## 16. Future Enhancements

### 16.1 Planned Features

#### Enhanced AI Capabilities
- **Multi-Model Ensembles**: Combine outputs from multiple LLMs
- **Fine-Tuned Models**: Custom SysMLv2 models trained on domain data
- **Reinforcement Learning**: Self-improving agents based on user feedback
- **Semantic Diff**: AI-powered change analysis

#### Collaboration Features
- **Real-Time Collaboration**: Multiple users editing same project
- **Version Control**: Git-like versioning for SysML models
- **Comments & Reviews**: Inline comments on models
- **Approval Workflows**: Formal review/approval process

#### Advanced Analysis
- **Simulation Integration**: Connect to simulation tools (MATLAB, Simulink)
- **Cost Estimation**: Automated cost analysis of solutions
- **Traceability Matrix**: Requirements ↔ Design ↔ Test tracing
- **Impact Analysis**: What-if scenario modeling

#### User Experience
- **Mobile App**: iOS/Android access
- **Offline Mode**: Work without internet
- **Template Library**: Pre-built SysML templates
- **Import/Export**: Support for other modeling tools (Cameo, MagicDraw)

### 16.2 Technical Improvements

#### Performance Optimization
- **Caching**: Redis for frequently accessed data
- **Database Indexing**: Optimize PostgreSQL queries
- **CDN**: Static asset delivery
- **Worker Queues**: Background processing with BullMQ

#### Scalability
- **Kubernetes Deployment**: Container orchestration
- **Horizontal Scaling**: Load-balanced replicas
- **Database Sharding**: Partition large datasets
- **Microservices Split**: Break monoliths into smaller services

#### Observability
- **Distributed Tracing**: OpenTelemetry
- **APM**: Application performance monitoring
- **Error Tracking**: Sentry integration
- **Usage Analytics**: Track feature adoption

### 16.3 Integration Roadmap

- **JIRA/GitHub Issues**: Link models to requirements
- **CI/CD Pipelines**: Automated model validation
- **Confluence/Notion**: Documentation generation
- **Slack/Teams**: Notifications and chat commands
- **PLM Systems**: Integration with Product Lifecycle Management

---

## Conclusion

The **N8N-Framework** represents a cutting-edge approach to AI-assisted systems engineering, combining the precision of SysMLv2 modeling with the power of Large Language Models. By providing:

- **Rigorous Validation**: Zero-tolerance syntax checking
- **Multi-Agent Intelligence**: Specialized agents for different tasks
- **Visual Workflow**: Intuitive drag-and-drop interface
- **Knowledge Integration**: Domain documents feed into analysis
- **Extensible Architecture**: Easy to add new features

This framework empowers systems engineers to design complex systems faster, with higher quality, and with AI assistance that actually understands SysMLv2 standards.

### Quick Reference

| Component | URL | Purpose |
|-----------|-----|---------|
| **Frontend** | http://localhost:3000 | Main user interface |
| **n8n** | http://localhost:5678 | Workflow management |
| **SysON** | http://localhost:8080 | Visual SysML editor |
| **MinIO** | http://localhost:9001 | File storage console |
| **Agent API** | http://localhost:8100 | SysML code generation |
| **Parser API** | http://localhost:8000 | Syntax validation |
| **SysON Bridge** | http://localhost:8010 | Visualization service |

### Support & Documentation

- **Setup Guide**: See `README.md` for detailed setup instructions
- **Assets**: Screenshots in `assets/` folder
- **Workflows**: Pre-configured n8n workflows in `n8n-workflows/`
- **Environment Template**: `.env.template` for configuration

### Contributing

To extend or modify this framework:

1. Fork the repository
2. Create feature branch
3. Make changes (follow architecture patterns)
4. Test thoroughly
5. Submit pull request with detailed description

### License

[Specify your license here]

---

**Document Version**: 1.0
**Last Updated**: 2025-12-08
**Framework Version**: 0.1.0
**Status**: Production-Ready for Research/Development Use

Add