---
description: Core rules, conventions, and architectural guidelines for the Polling App with QR Code Sharing project.
globs:
  alwaysApply: true
---

## Project Overview
You are an expert full-stack developer working on the Polling App codebase.  
The goal is to build a web application that allows users to register, create polls, and share them via unique links and QR codes for others to vote on.

Adhere strictly to the rules, patterns, and conventions outlined in this document to ensure code quality, consistency, and maintainability.

---

## Technology Stack
The project uses the following technologies. Do not introduce new libraries or frameworks without explicit instruction:

- Language: **TypeScript**
- Main Framework: **Next.js (App Router)**
- Database & Auth: **Supabase**
- Styling: **Tailwind CSS with shadcn/ui components**
- Forms: **react-hook-form** for all forms
- State Management: Use **Server Components** for server state. Use `useState` or `useReducer` for local component state in Client Components.
- API Communication: Use **Next.js Server Actions** for mutations (creating polls, voting). Fetch data in Server Components using the Supabase client.
- Utility Libraries: Use `qrcode.react` (or similar) for generating QR codes.

---

## Architecture & Code Style
- **Directory Structure**: Follow the Next.js App Router conventions:
  - `/app` → routes and pages
  - `/app/api` → colocated API logic (route handlers)
  - `/app/polls/` → polls with dynamic routes
  - `/components/ui` → `shadcn/ui` components
  - `/components/` → custom, reusable components
  - `/lib` → Supabase client setup, utility functions, Server Actions

- **Poll Model**:
  - `question: string`
  - `options: string[]`
  - `createdBy: userId`
  - `createdAt: timestamp`
  - `expiresAt?: timestamp`

- **Component Design**:
  - Prefer **Server Components** for fetching & displaying data
  - Use **Client Components** (`'use client'`) only when interactivity is required (hooks, event listeners)

- **Naming Conventions**:
  - Component files → PascalCase (`CreatePollForm.tsx`)
  - Utility & action functions → camelCase (`submitVote.ts`)

- **Error Handling**:
  - Use `try/catch` in Server Actions and Route Handlers
  - Use `error.tsx` in route segments for error boundaries

- **API Keys & Secrets**:
  - Never hardcode
  - Load from `.env.local` → `process.env.NEXT_PUBLIC_SUPABASE_URL`, `process.env.SUPABASE_SECRET_KEY`

---

## Code Patterns to Follow
- ✅ Use a **form + Server Action** to handle data submission
- ❌ Do NOT create a separate API route + fetch on the client side for forms
- ❌ Do NOT fetch data in `useEffect` + `useState` on pages — fetch directly in Server Components
- ✅ Use **shadcn/ui** components for UI consistency
- ✅ Generate and display a QR code for each poll link

---

## Verification Checklist
Before finalizing your response, you MUST verify:

- [ ] Code uses **Next.js App Router** + Server Components for data fetching  
- [ ] **Server Actions** handle all data mutations (forms, votes)  
- [ ] **Supabase client** used for all DB interactions  
- [ ] **shadcn/ui** components used for UI where appropriate  
- [ ] Secrets loaded from **environment variables**, not hardcoded  
- [ ] Polls follow the defined model (question, options[], createdBy, createdAt, expiresAt)  
- [ ] Polls are shareable via **unique URL** (and support future QR code feature)  
