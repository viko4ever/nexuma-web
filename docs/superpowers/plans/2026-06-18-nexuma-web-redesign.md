# Nexuma Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Nexuma web project into a premium, high-conversion "Digital Operating Layer" site.

**Architecture:** Component-driven development with Vite/React, using Framer Motion for premium interactions and a structured grid layout for content.

**Tech Stack:** React, Vite, Framer Motion, Tailwind CSS (to be added for styling control), Three.js (for subtle background visuals).

## Global Constraints
- **Design:** Minimalist sophistication, heavy negative space, surgical animations.
- **Conversion:** Every page must lead to a "Solicitar Diagnóstico" CTA.
- **Performance:** High-performance, low-distraction interactions.

---

### Task 1: Environment & Styling Foundation

**Files:**
- Modify: `package.json` (add Tailwind, Framer Motion)
- Create: `tailwind.config.js`
- Modify: `src/index.css` (Base styles, Typography setup)

- [ ] **Step 1: Install dependencies**
Run: `npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p`
- [ ] **Step 2: Configure Tailwind**
Update `tailwind.config.js` with project palette (Black, White, Deep Electric Blue).
- [ ] **Step 3: Setup Global Typography**
Update `src/index.css` to import high-end font stacks (Inter/serif).
- [ ] **Step 4: Commit**
`git add package.json tailwind.config.js src/index.css && git commit -m "chore: setup tailwind and typography"`

### Task 2: Hero Section Implementation

**Files:**
- Create: `src/components/Hero.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create Hero component**
Implement the split-layout Hero section with high-impact headline and "Solicitar Diagnóstico" CTA.
- [ ] **Step 2: Add Framer Motion entry**
Wrap components in `motion.div` for surgical fade/slide effects.
- [ ] **Step 3: Integrate into App**
`App.jsx` renders `Hero`.
- [ ] **Step 4: Commit**
`git add src/components/Hero.jsx src/App.jsx && git commit -m "feat: implement hero section"`

### Task 3: Premium Service Catalog

**Files:**
- Create: `src/components/ServiceCatalog.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Build Grid Component**
Create a grid container using Tailwind with card components for services.
- [ ] **Step 2: Add hover interaction**
Use Framer Motion `whileHover` to reveal detailed service impact.
- [ ] **Step 3: Commit**
`git add src/components/ServiceCatalog.jsx && git commit -m "feat: add premium service catalog"`

### Task 4: Conversion & Trust Section

**Files:**
- Create: `src/components/FinalCTA.jsx`
- Create: `src/components/TrustBar.jsx`

- [ ] **Step 1: Create Trust Bar**
Add placeholders for metrics ("Process Efficiency", etc.).
- [ ] **Step 2: Create Final CTA**
Build the minimal conversion form.
- [ ] **Step 3: Commit**
`git add src/components/FinalCTA.jsx src/components/TrustBar.jsx && git commit -m "feat: add final conversion components"`

---

## Self-Review
- **Spec Coverage:** Implements Hero, Services, CTA, and Trust sections as defined in design spec.
- **Placeholder Scan:** Trust metrics are clearly marked as placeholders.
- **Consistency:** Tailwind classes and Framer motion usage are standardized across components.

---

Plan complete and saved to `docs/superpowers/plans/2026-06-18-nexuma-web-redesign.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints.

**Which approach?**