# ShieldDrive Insurance - Frontend Engineer Assessment

A high-performance lead generation landing page built with Next.js App Router, Tailwind CSS, shadcn/ui, and Prisma.

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- A PostgreSQL database (Neon, Supabase, Railway, or local Docker)

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 2. Environment Variables
Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```
Update the `DATABASE_URL` in `.env` with your PostgreSQL connection string.

### 3. Database Setup & Seeding
Push the Prisma schema to your database and run the seed script:
```bash
npx prisma db push
npm run seed
```
*(Note: If you run into issues with the seed script, ensure you have `tsx` installed globally or use `npx tsx prisma/seed.ts`)*

### 4. Running Locally
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Vehicle Seed Data Generation

The vehicle seed data was generated using a structured JavaScript object containing a realistic dictionary of 18 top US car makes and 3-5 popular models per make. The script loops over the last 15 years (from the current year backwards) and generates all combinations, resulting in approximately 1,200 unique vehicle configurations.

**Prompt logic used:**
*"Generate a JS object mapping the 15-20 most common US car makes to an array of their 3-5 most popular models. I will use this to programmatically loop over the last 15 years and insert all valid Year/Make/Model combinations into Postgres."*

The raw seed script can be found in `prisma/seed.ts`.

## Trade-offs & Decisions

1. **Component Library:** I opted to use standard HTML inputs wrapped in React Hook Form instead of the heavily abstracted `shadcn/ui` Form wrapper. This reduces DOM bloat, minimizes client-side JavaScript, and makes the component significantly easier to read and maintain, while still leveraging shadcn's atomic UI elements (Input, Label, Button).
2. **API Design:** Instead of relying entirely on React Server Actions, I built RESTful API Route Handlers (`/api/vehicles/*`). This allows the frontend to be completely decoupled and enables easy caching of static vehicle data at the CDN level if needed in the future.
3. **State Management:** Simple React `useState` and `useEffect` were sufficient for cascading dropdowns. I avoided adding heavier caching libraries like React Query to keep the bundle size small, meeting the strict `<150KB` performance requirement.
4. **Debouncing:** I used a simple disabled state on the submit button to prevent duplicate rapid-fire submissions. With more time, I would implement a strict rate-limiter on the `/api/leads` route using Redis (Upstash) to prevent abuse.

## Lighthouse & Performance
See [PERFORMANCE.md](./PERFORMANCE.md) for detailed web vitals and Lighthouse scores.
