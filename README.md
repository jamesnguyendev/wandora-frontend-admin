# 📈 TradeHubPro Dashboard

[![Version](https://img.shields.io/badge/Version-1.0.0-blue)](https://github.com/jamesnguyendev/tradehubpro-dashboard)  
[![License](https://img.shields.io/github/license/jamesnguyendev/tradehubpro-dashboard)](LICENSE)  
[![GitHub stars](https://img.shields.io/github/stars/jamesnguyendev/tradehubpro-dashboard.svg?style=social&label=Star)](https://github.com/jamesnguyendev/tradehubpro-dashboard)  

---

## 📌 Introduction

The **TradeHubPro Dashboard** is a comprehensive user interface designed to provide traders with the ability to **monitor, analyze, and manage** their trading activities efficiently and intuitively.  

This application delivers **real-time charts, statistical metrics, and analytical tools** to help users make informed trading decisions.  

---

## ✨ Key Features

* **Performance Analytics:** Track vital metrics like P&L (Profit & Loss), Max Drawdown, and Win/Loss Ratios.  
* **Visual Trading Charts:** Interactive charts for trading history and performance.  
* **Order Book Management:** View pending and executed orders in real-time.  
* **Multi-Exchange Integration:** Connect to multiple trading exchanges (if applicable).  
* **Dark/Light Mode:** User interface preference options.  
* **Authentication & Security:** NextAuth.js + bcrypt password hashing.  
* **Customizable UI:** Drag & Drop components using `@dnd-kit`.  

---

## 🛠️ Technology Stacks

A list of the main technologies and libraries used in this project:

* **Frontend:**
  * Next.js (React 19, App Router)
  * Tailwind CSS 4, Radix UI, Lucide Icons
  * Recharts (Data Visualization), React Hook Form + Zod (Forms & Validation)

* **Backend & API:**
  * Node.js (Next.js API Routes)
  * NextAuth.js (Authentication)
  * bcrypt / bcryptjs (Password Hashing)
 
* **Database:**
  * MongoDB
  * Mongoose (ODM)

---

## 🚀 Installation and Setup

### Prerequisites

* Node.js `>= 18.x`  
* pnpm / npm / yarn  

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jamesnguyendev/tradehubpro-dashboard.git
   cd tradehubpro-dashboard
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   # OR
   npm install
   # OR
   yarn install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   NEXTAUTH_SECRET=your_secret
   NEXTAUTH_URL=http://localhost:3000
   EMAIL="youremail"
   PASSWORD="yourpassword"
   NEXT_PUBLIC_API_URL=your_local_host/api
   MONGODB_URI=mongodb://localhost:27017/tradehubpro
   ```

4. **Run the application (development):**
   ```bash
   pnpm dev
   # OR
   npm run dev
   # OR
   yarn dev
   ```
   The app will be available at: [http://localhost:3000](http://localhost:3000)

5. **Build for production:**
   ```bash
   npm build
   npm start
   ```

---

## ⚙️ Main Project Structure

```
src/
  app/          -> Next.js app router (pages & routes)
  components/   -> UI components
  hooks/        -> Custom React hooks
  lib/          -> Utils & config
  models/       -> Mongoose schemas
  services/     -> API services (axios, react-query)
  store/        -> Zustand state management
public/         -> Static assets
styles/         -> Global styles
package.json
README.md
```

---

## 🔐 Security

* Password hashing with bcrypt / bcryptjs  
* ESLint plugins: `eslint-plugin-security`, `eslint-plugin-sonarjs`  
* OWASP-aligned best practices  

---

## 📜 License

MIT License © 2025 [James Nguyen / Org]  
# wandora-frontend-admin
