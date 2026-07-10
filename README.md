# ShieldDrive Insurance - Frontend Engineer Assessment

A high-performance lead generation landing page built with Next.js App Router, Tailwind CSS, shadcn/ui, and Prisma/PostgreSQL.

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- A PostgreSQL database connection string (e.g., Supabase, Neon, or local Docker)

### 1. Installation
Clone the repository and install the required dependencies:
```bash
npm install
```

### 2. Environment Setup
Create a `.env` file in the root of the project. You can copy the example file to get started:
```bash
cp .env.example .env
```
Make sure to update the `DATABASE_URL` in your `.env` file with your actual PostgreSQL connection string.

### 3. Database Setup & Seeding
This project uses Prisma as the ORM. You need to push the schema to your database to create the required tables (`Vehicle` and `Lead`), and then seed the database with the initial car data.

Run the following commands in order:

```bash
# Generate the Prisma Client
npx prisma generate

# Push the database schema to your Postgres instance
npx prisma db push

# Seed the database with vehicle makes, models, and years
npm run seed
```

*Note: The seed script uses `tsx` to execute TypeScript natively. It inserts roughly 1,127 unique vehicle configurations and utilizes a bulk `createMany` operation to ensure seeding takes less than 2 seconds.*

### 4. Running Locally
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Trade-offs & Decisions

1. **Component Library:** I opted to use standard HTML inputs wrapped in React Hook Form instead of the heavily abstracted `shadcn/ui` Form wrapper. This reduces DOM bloat, minimizes client-side JavaScript, and makes the component significantly easier to read and maintain, while still leveraging shadcn's atomic UI elements (Input, Label, Button).
2. **API Design:** Instead of relying entirely on React Server Actions, I built RESTful API Route Handlers (`/api/vehicles/*`). This allows the frontend to be completely decoupled from the data layer and enables easy caching of static vehicle data at the CDN level if needed in the future.
3. **State Management:** Simple React `useState` and `useEffect` were sufficient for cascading dropdowns. I avoided adding heavier caching libraries like React Query to keep the bundle size small, meeting the strict `<150KB` initial load requirement.
4. **UX & Rate Limiting:** I used simple disabled states and graceful loading spinners on the form inputs to handle asynchronous fetches cleanly without causing layout shifts (0 CLS). With more time, I would implement a strict rate-limiter on the `/api/leads` route using Redis to prevent API abuse.

## DB Design and the logical relationship
<img width="460" height="348" alt="image" src="https://github.com/user-attachments/assets/fa2497b5-bf74-484c-b0d8-61e94651fe29" />

<img width="231" height="385" alt="image" src="https://github.com/user-attachments/assets/60c42ca4-fe6a-465f-9b5e-de37f29b1c6a" />


## Lighthouse & Performance
See [PERFORMANCE.md](./PERFORMANCE.md) for detailed web vitals and Lighthouse scores.
