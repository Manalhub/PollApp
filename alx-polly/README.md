# Polling App with QR Code Sharing

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) that allows users to create polls, share them via unique links and QR codes, and collect votes.

## Features

- **User Authentication**: Register, login, and password reset functionality
- **Poll Creation**: Create polls with multiple options
- **Voting System**: Vote on polls with real-time results
- **Shareable Links**: Each poll has a unique URL for sharing
- **QR Code Generation**: Generate QR codes for easy poll sharing
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Mode**: Theme toggle for user preference

## Technology Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Database & Auth**: Supabase
- **Styling**: Tailwind CSS with shadcn/ui components
- **Forms**: react-hook-form
- **State Management**: Server Components for server state, React hooks for client state
- **API Communication**: Next.js Server Actions

## Project Structure

```
/app                  # Next.js App Router routes
  /auth               # Authentication pages
    /login            # Login page
    /register         # Registration page
    /reset-password   # Password reset page
  /polls              # Poll listing and detail pages
    /[id]             # Dynamic route for individual polls
  /create-poll        # Poll creation page
/components           # Reusable React components
  /ui                 # shadcn/ui components
/lib                  # Utility functions and Supabase client
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Data Model

### Poll

```typescript
interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  createdBy: string; // userId
  createdAt: Date;
  expiresAt?: Date; // Optional expiration date
}

interface PollOption {
  id: string;
  text: string;
  votes: number;
}
```

## API Endpoints

This application uses Next.js App Router and Server Actions for data handling. Here are the available endpoints:

### Authentication

- `GET /auth/login` - Login page
- `GET /auth/register` - Registration page
- `GET /auth/reset-password` - Password reset page

### Polls

- `GET /polls` - List all available polls
- `GET /polls/[id]` - View a specific poll by ID
- `GET /create-poll` - Create a new poll form

### Server Actions (API Routes)

The following server actions are used for data mutations:

- `createPoll` - Create a new poll with options
- `submitVote` - Submit a vote for a specific poll option
- `getUserPolls` - Get polls created by the current user

### QR Code Generation

Each poll has a unique shareable link that can be converted to a QR code for easy sharing.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
