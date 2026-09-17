# Campus Action AI 🎓🚀

> **Tagline:** Turn Campus Benefits into Student Action  
> **Product Category:** AI-Powered Campus Opportunity, Benefits & Student Support Platform

---

## 🌟 Overview

A college already publishes information about financial assistance, research incentives, startup support, internships, medical benefits, career support, global opportunities, and student welfare schemes.

Static notices, posters, brochures, and websites leave students asking:
- *Am I eligible?*
- *Why am I eligible?*
- *What documents do I need?*
- *Where should I apply?*
- *What is the current status of my application?*

**Campus Action AI** converts official institutional information into an actionable digital workflow:

$$\text{PHYSICAL POSTER / NOTICE} \longrightarrow \text{QR CODE} \longrightarrow \text{CAMPUS ACTION AI} \longrightarrow \text{DETERMINISTIC ELIGIBILITY} \longrightarrow \text{DOCUMENT CHECKLIST} \longrightarrow \text{APPLICATION STATUS TRACKER} \longrightarrow \text{ADMIN WORKFLOW}$$

---

## ✨ Features

- **Mandatory Brand Identity**: Modern Orange (`#F97316`) & White theme, light-mode first design, Inter font, mobile-responsive screens for students.
- **Deterministic Eligibility Engine**: Pure rule-based evaluation comparing student academic profiles against institution-configured criteria (`GREEN` Likely Eligible / `YELLOW` Requires Verification / `RED` Not Eligible).
- **Interactive QR Scan Deep-Linking**: `/scan/[benefitId]` landing route simulating physical campus poster scans.
- **Printable QR Poster Generator**: Admin generator creating A4 printable posters with high-res QR codes, institution header, and physical campaign location tags.
- **Application & Clarification Workflow**:
  - Vertical timeline progress tracker (`Submitted` → `Faculty Verification` → `Department Review` → `Approved`).
  - Interactive **Request Clarification** workflow allowing students to respond directly to department notes.
  - Document status inspection (`VERIFIED`, `UNDER_REVIEW`, `REJECTED`).
- **Visual Eligibility Rule Builder**: Admin wizard to configure rules (`ALL`/`ANY` logic) without writing code.
- **Repository Abstraction Layer**: Clean service factory abstraction separating UI components from storage (`DEMO` localStorage / `LIVE` Supabase PostgreSQL).
- **AI Student Assistant**: Grounded in official institutional circulars and FAQs with safe offline fallback.
- **Governance Audit Logs & Funnel Analytics**: Complete administrative action history and conversion metrics (`scans` → `application_approved`).

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm 9+ or 10+

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Tarunmakode123/CampusActionAI.git
   cd CampusActionAI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **QR Generation**: `qrcode`
- **Architecture**: Repository Pattern + Service Abstraction Layer

---

## 🔒 Security & Persistence Architecture

- **DEMO MODE**: UI → Service Layer → Demo Repository → LocalStorage (Non-sensitive demo fixtures).
- **LIVE MODE**: UI → Service Layer → Supabase Repository → Supabase PostgreSQL / Storage.

---

## 📜 License

Built for Higher Education Institutions.
