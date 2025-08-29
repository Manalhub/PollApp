import Link from 'next/link';

export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">Welcome to Polly</h1>
      <p className="text-xl text-[hsl(var(--muted-foreground))] max-w-2xl mb-10">
        Create and participate in polls with our easy-to-use polling application.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/polls" 
          className="px-6 py-3 text-lg font-medium bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-md hover:bg-[hsl(var(--primary))]/90 transition-colors"
        >
          View Polls
        </Link>
        <Link 
          href="/create-poll" 
          className="px-6 py-3 text-lg font-medium bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] rounded-md hover:bg-[hsl(var(--secondary))]/90 transition-colors"
        >
          Create a Poll
        </Link>
      </div>
      
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl">
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-bold mb-2">Create</h2>
          <p className="text-[hsl(var(--muted-foreground))]">Create custom polls with multiple options and set duration.</p>
        </div>
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-bold mb-2">Share</h2>
          <p className="text-[hsl(var(--muted-foreground))]">Share your polls with friends, colleagues, or the public.</p>
        </div>
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-bold mb-2">Analyze</h2>
          <p className="text-[hsl(var(--muted-foreground))]">View real-time results and analyze voting patterns.</p>
        </div>
      </div>
    </div>
  );
}
