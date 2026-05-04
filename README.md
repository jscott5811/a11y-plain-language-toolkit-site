# Accessibility & Plain Language Toolkit

A comprehensive design system and utility suite for translating complex, jargon-heavy text into accessible, reader-first formats. This toolkit is built to help organizations meet WCAG 2.2 standards by providing tools for **Plain Language** and **Easy Read** conversions.

![Version Alpha](https://img.shields.io/badge/version-alpha-orange)
![WCAG 2.2](https://img.shields.io/badge/WCAG-2.2_Ready-blue)
![License Apache-2.0](https://img.shields.io/badge/license-Apache--2.0-green)

## 🚀 Features

- **Translation Sandbox**: Interactively convert technical or legal text into Plain Language (6th-8th grade level) or Easy Read (3rd-5th grade level) with instant previews.
- **Readability Checker**: Analyze text metrics including Flesch Reading Ease, sentence length distribution, and automated jargon detection.
- **AI Prompt Builder**: Generate high-quality system instructions for LLMs (like Gemini, GPT-4, or Claude) to automate accessible content creation.
- **Design System Overview**: A built-in guide for accessibility-first typography, spacing, and communication standards.
- **Dark Mode Support**: A fully responsive, high-contrast interface designed for various viewing environments.

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4.0
- **Icons**: Lucide React
- **Animations**: Motion (f.k.a. Framer Motion)

## 📖 Accessibility Standards

This project focuses on two primary accessibility formats:

### Plain Language
Targets a **6th to 8th-grade** reading level. It uses:
- Active voice and direct address ("you").
- Short sentences (12-18 words).
- Standard terminology with immediate explanations for new terms.

### Easy Read
Targets a **3rd to 5th-grade** reading level. It uses:
- A "one idea per line" structure.
- Visual anchors (icons/emojis) for each point.
- Extremely literal wording and minimal compound sentences.

## 💻 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/a11y-plain-language-toolkit.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## 🚀 Deployment to GitHub Pages

This project is configured to deploy automatically via GitHub Actions.

1. Go to your GitHub repository's **Settings** tab.
2. Navigate to **Pages** in the sidebar.
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. Push your code to the `main` branch, and the "Deploy static content to Pages" workflow will handle the rest.

### Building for Production
```bash
npm run build
```

## 📜 License

This project is licensed under the Apache License 2.0. See the `LICENSE` file for details (or `App.tsx` headers).

---
*Built with clarity and inclusion in mind.*
