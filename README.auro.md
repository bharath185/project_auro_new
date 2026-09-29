# Project Auro — Autonomous Multi-Agent Project Planning System

Built on top of [Paperclip](https://github.com/paperclipai/paperclip) — customized and rebranded as **Project Auro** for fully automated AI-driven project planning.

---

## 🚀 Quick Start

### Prerequisites
- [Node.js 20+](https://nodejs.org)
- [pnpm](https://pnpm.io) — `npm install -g pnpm`
- [Gemini CLI](https://github.com/google-gemini/gemini-cli) — `npm install -g @google/gemini-cli`

### 1. Clone & Install
```bash
git clone https://github.com/bharath185/project_auro_new.git
cd project_auro_new
pnpm install
```

### 2. Start the App
**Windows (double-click or run):**
```bat
start.bat
```

**PowerShell:**
```powershell
.\start.ps1
```

**Manual:**
```powershell
$env:GEMINI_API_KEY="your-key-here"
$env:GOOGLE_API_KEY="your-key-here"
$env:GEMINI_CLI_TRUST_WORKSPACE="true"
pnpm paperclipai run
```

### 3. Open Browser
👉 http://127.0.0.1:3100

### 4. Apply Agent Instructions (first time only)
After the app starts and you've logged in/set up your workspace, run:
```bash
node setup-agents.js
```
This configures all 6 AI agents with their specialized instructions.

---

## 🤖 The AI Team

| Agent | Role | Responsibility |
|-------|------|---------------|
| **Alexander Wright** | CEO | Your ONLY point of contact. Receives projects, orchestrates the team |
| **Aria Chen** | CTO | Technical Architecture, Stack Design, ADRs |
| **Marcus Vance** | PM | Project Plan, Sprint Plan, User Stories, RACI |
| **David Kim** | QA | Test Strategy, Acceptance Criteria, QA Gates |
| **Elena Rostova** | Security | STRIDE Threat Model, Compliance, Security Requirements |
| **Sanjay Patel** | DevOps | Infrastructure Plan, CI/CD Design, Observability |

---

## 📋 How to Use

1. **Click `+ New Project`** in the sidebar
2. **Write your project description** (a paragraph is enough)
3. **Assign to Alexander Wright (CEO)**
4. **Click Create**

The team automatically produces **6 planning documents** in parallel:

| Document | Author | Content |
|----------|--------|---------|
| `brief` | CEO | Project Brief & Goals |
| `architecture` | CTO | Tech Stack, Data Model, API Design |
| `plan` | PM | Epics, Sprints, User Stories, RACI |
| `test-plan` | QA | Test Strategy, Acceptance Criteria |
| `security-review` | Security | Threat Model, Compliance, Security Requirements |
| `infra-plan` | DevOps | Environments, CI/CD, Observability |
| `charter` | CEO | **Synthesized Project Charter (all docs combined)** |

All documents are **downloadable** (`.md`) from the task's **Documents tab**.

---

## 📁 Key Files

```
project_auro_new/
├── .env                      ← API keys (Gemini)
├── start.bat                 ← Windows startup (double-click)
├── start.ps1                 ← PowerShell startup
├── setup-agents.js           ← Configure agents (run once)
├── agent-configs/
│   └── agents/
│       ├── alexander-wright/AGENTS.md   ← CEO instructions
│       ├── aria-chen/AGENTS.md          ← CTO instructions
│       ├── marcus-vance/AGENTS.md       ← PM instructions
│       ├── david-kim/AGENTS.md          ← QA instructions
│       ├── elena-rostova/AGENTS.md      ← Security instructions
│       └── sanjay-patel/AGENTS.md       ← DevOps instructions
└── ui/src/                   ← Project Auro custom UI
```

---

## 🎨 Customizations vs Upstream

- **Branding**: Rebranded from "Paperclip" → "Project Auro" throughout the UI
- **Sidebar**: Added Project Planning section (Projects, Sprints, Stories, Backlog)
- **Dashboard**: Project-centric metrics (Team Online, Active Stories, Sprint Spend, CEO Sign-off)
- **Theme**: Obsidian dark palette (`#090d16` bg, electric indigo `#6366f1` accents)
- **Agent System**: 6 specialized agents with autonomous project planning instructions
- **Local-only**: Removed all external links (docs, feedback, telemetry)

---

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Google Gemini API key |
| `GOOGLE_API_KEY` | Same as GEMINI_API_KEY |
| `GEMINI_CLI_TRUST_WORKSPACE` | Set to `true` (required for local agents) |

Get a Gemini API key: https://aistudio.google.com/app/apikey
