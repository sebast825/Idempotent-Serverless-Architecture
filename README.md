# Idempotent Serverless Architecture

A technical case study focused on backend correctness, distributed consistency, and domain integrity under adverse conditions (retries, concurrency, and untrusted clients).


> **Note:** This project uses a Mastermind game implementation to demonstrate how to design systems that remain correct despite network failures or malicious client behavior.

## The Challenge
Stateless serverless environments (Edge Functions/Server Actions) are prone to:
- **Automatic Retries:** Infrastructure re-running failed requests.
- **Race Conditions:** Concurrent requests attempting to mutate the same state.
- **Client Latency:** Users double-clicking or resubmitting intents.
  

## Key Architectural Features

- **Idempotency by Design:** All critical mutations use persistence-level keys and uniqueness constraints to guarantee exactly-once execution.- 
- **Server-Authoritative Model:** The client only expresses *intent*. All domain invariants, permissions, and state transitions are enforced on the server.
- **SSR Session Synchronization:** Using Next.js Middleware and Supabase SSR, we enforce a unified session state. This prevents "flash of unauthenticated content" (FOUC) and ensures that server-side redirects are handled before the page reaches the browser.
- **Transactional Consistency:** Atomic transactions ensure that race conditions cannot lead to invalid game states.

## Tech Stack
- **Next.js 15 (App Router)** - Server Actions & Middleware.
- **Prisma & PostgreSQL** - Atomic transactions and uniqueness constraints.
- **Supabase Auth** - Server-side session management (SSR).
- **Zustand** - Client-side state synchronization.

---
## Getting Started

### 1. Prerequisites
* **Node.js 18+** and **npm** (or pnpm/yarn).
* A **Supabase** project (Auth & Database).
* A **PostgreSQL** instance (provided by Supabase).

### 2. Environment Variables
Create a `.env.local` file in the root directory and fill in your credentials:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Database (Prisma)
# Transaction mode (PgBouncer) is recommended for serverless environments
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT_ID].supabase.co:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT_ID].supabase.co:5432/postgres"

# App Redirects
# Local: http://localhost:3000 | Production: Your deployment custom domain
PRODUCTION_URL=http://localhost:3000
```
### 3. Installation & Database Setup
```bash
# Install dependencies
npm install

# Sync Prisma schema with your database
npx prisma db push

# Generate Prisma client
npx prisma generate
```

### 4. Running the App
```bash
# Start the development server
npm run dev
```
