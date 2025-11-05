# 🧭 Wandora Admin Dashboard

## 📌 Introduction

**Wandora Admin** is a modern, full-featured administration panel built with **Next.js**, **TypeScript**, and **Tailwind CSS**.  
It provides robust management tools, analytics, and a fully customizable interface designed for trading and portfolio monitoring.  
With a focus on performance, scalability, and clean architecture, this dashboard is ideal for both startup and enterprise environments.

---

## 🛠️ Technology Stack

### **Frontend**

- **Next.js 15** (App Router + Turbopack)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Radix UI / ShadCN UI**
- **TanStack Query & Table**
- **Next-Themes** for dark/light mode

### **Backend**

- **NextAuth.js** for authentication
- **Axios** for API communication
- **bcrypt / bcryptjs** for password hashing

### **Database**

- Compatible with **PostgreSQL**, **MySQL**, **MongoDB**, or other API-based data sources  
  (via custom backend or API integration).

---

## ⚙️ Setup & Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/jamesnguyendev/wandora-frontend-admin.git
cd wandora-frontend-admin

# 2️⃣ Install dependencies
npm install

# 3️⃣ Set up environment variables
cp .env
```

Then edit your `.env` file:

```bash
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

---

## 🧱 Project Structure

```
wandora-frontend-admin/
│
├── src/
│   ├── app/            # Next.js app router pages
│   ├── components/     # Shared React UI components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and constants
│   ├── store/          # Zustand stores (global state)
│   ├── types/          # TypeScript interfaces and models
│   ├── utils/          # Helper functions (token, format, etc.)
│   └── scripts/        # Node scripts (theme generation, etc.)
│
├── public/             # Static assets (images, icons, etc.)
├── styles/             # Global styles or Tailwind configs
├── .env.example        # Example environment configuration
├── package.json        # Dependencies and project scripts
├── tsconfig.json       # TypeScript configuration
├── tailwind.config.ts  # Tailwind configuration
└── README.md           # Documentation
```

---

## 🔐 Security

Passwords are hashed using **bcrypt** before storage.  
Authentication is handled securely with **NextAuth.js**.  
Environment variables are safely managed through **.env.local**.  
Adheres to **OWASP** and **Next.js** security best practices.  
Linting includes **eslint-plugin-security** and **eslint-plugin-sonarjs** for static code analysis.

---

## 📦 Deployment

You can deploy easily to the following platforms:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Render**
- **Any Node.js–based hosting platform**

⚙️ Make sure your environment variables are correctly configured  
in your deployment environment.

---

## 📜 License

MIT License © 2025 **James Nguyen / Org**  
**Project:** wandora-frontend-admin
