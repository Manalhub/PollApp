'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Container } from '@/components/ui/container';

type Poll = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  votesCount: number;
};

export default function PollsPage() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchPolls = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const mockPolls: Poll[] = [
            {
              id: '1',
              title: 'Favorite Programming Language',
              description: 'What is your favorite programming language?',
              createdAt: '2023-06-15T10:00:00Z',
              votesCount: 256
            },
            {
              id: '2',
              title: 'Best Frontend Framework',
              description: 'Which frontend framework do you prefer?',
              createdAt: '2023-06-10T14:30:00Z',
              votesCount: 189
            },
            {
              id: '3',
              title: 'Remote Work Preferences',
              description: 'How often do you prefer to work remotely?',
              createdAt: '2023-06-05T09:15:00Z',
              votesCount: 324
            },
          ];
          setPolls(mockPolls);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching polls:', error);
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Container className="py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Available Polls</h1>
        <Button asChild>
          <Link href="/create-poll">
            Create New Poll
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[hsl(var(--muted))] border-t-[hsl(var(--primary))]"></div>
          <p className="text-[hsl(var(--muted-foreground))]">Loading polls...</p>
        </div>
      ) : polls.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {polls.map((poll) => (
            <Card
              key={poll.id}
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2">{poll.title}</h2>
                <p className="text-[hsl(var(--muted-foreground))] mb-4">{poll.description}</p>
                <div className="flex justify-between items-center text-sm text-[hsl(var(--muted-foreground))]">
                  <span>{formatDate(poll.createdAt)}</span>
                  <span>{poll.votesCount} votes</span>
                </div>
              </CardContent>
              <CardFooter className="border-t border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.5)] px-6 py-3">
                <Button variant="link" asChild className="p-0">
                  <Link href={`/polls/${poll.id}`}>
                    View Poll &rarr;
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto mb-4 text-[hsl(var(--muted-foreground))]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="text-xl font-medium text-[hsl(var(--foreground))] mb-4">No polls available yet</h3>
              <p className="text-[hsl(var(--muted-foreground))] mb-6">Be the first to create a poll!</p>
              <Button asChild>
                <Link href="/create-poll">
                  Create New Poll
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}