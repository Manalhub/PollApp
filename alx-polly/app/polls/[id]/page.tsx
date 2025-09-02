'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Container } from '@/components/ui/container';

type PollOption = {
  id: string;
  text: string;
  votes: number;
};

type Poll = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  options: PollOption[];
  totalVotes: number;
};

export default function PollDetailPage({ params }: { params: { id: string } }) {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchPoll = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const mockPoll: Poll = {
            id: params.id,
            title: params.id === '1' ? 'Favorite Programming Language' : 'Sample Poll',
            description: 'Please select your preferred option',
            createdAt: '2023-06-15T10:00:00Z',
            options: [
              { id: 'opt1', text: 'JavaScript', votes: 120 },
              { id: 'opt2', text: 'Python', votes: 80 },
              { id: 'opt3', text: 'Java', votes: 40 },
              { id: 'opt4', text: 'C#', votes: 16 },
            ],
            totalVotes: 256
          };
          setPoll(mockPoll);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching poll:', error);
        setLoading(false);
      }
    };

    fetchPoll();
  }, [params.id]);

  const handleVote = async () => {
    if (!selectedOption || !poll) return;

    // TODO: Replace with actual API call
    try {
      // Simulate API call
      console.log(`Voted for option ${selectedOption} in poll ${poll.id}`);
      
      // Update local state to reflect the vote
      const updatedOptions = poll.options.map(option => {
        if (option.id === selectedOption) {
          return { ...option, votes: option.votes + 1 };
        }
        return option;
      });

      setPoll({
        ...poll,
        options: updatedOptions,
        totalVotes: poll.totalVotes + 1
      });

      setHasVoted(true);
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculatePercentage = (votes: number) => {
    if (!poll || poll.totalVotes === 0) return 0;
    return Math.round((votes / poll.totalVotes) * 100);
  };

  if (loading) {
    return (
      <Container className="py-8">
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[hsl(var(--muted))] border-t-[hsl(var(--primary))]"></div>
              <p className="text-[hsl(var(--muted-foreground))]">Loading poll...</p>
            </div>
          </CardContent>
        </Card>
      </Container>
    );
  }

  if (!poll) {
    return (
      <Container className="py-8">
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto mb-4 text-[hsl(var(--muted-foreground))]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-medium text-[hsl(var(--foreground))] mb-4">Poll not found</h3>
              <p className="text-[hsl(var(--muted-foreground))] mb-6">The poll you're looking for doesn't exist or has been removed.</p>
              <Button asChild>
                <Link href="/polls">Back to Polls</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/polls" className="inline-flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Polls
        </Link>
      </Button>

      <Card className="overflow-hidden animate-fade-in">
        <CardHeader>
          <CardTitle className="text-2xl">{poll.title}</CardTitle>
          <CardDescription>{poll.description}</CardDescription>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Created on {formatDate(poll.createdAt)}</p>
        </CardHeader>
        <CardContent>

          <div className="space-y-4">
            {poll.options.map((option) => (
              <div 
                key={option.id} 
                className={`border rounded-md p-4 transition-all ${selectedOption === option.id ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.05)]' : 'border-[hsl(var(--border))]'} ${!hasVoted ? 'cursor-pointer hover:border-[hsl(var(--primary))]' : ''}`}
                onClick={() => !hasVoted && setSelectedOption(option.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {!hasVoted && (
                      <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${selectedOption === option.id ? 'border-[hsl(var(--primary))]' : 'border-[hsl(var(--muted-foreground))]'}`}>
                        {selectedOption === option.id && (
                          <div className="w-3 h-3 rounded-full bg-[hsl(var(--primary))]"></div>
                        )}
                      </div>
                    )}
                    <label htmlFor={option.id} className={`${!hasVoted ? 'cursor-pointer' : ''} ${selectedOption === option.id ? 'font-medium' : ''}`}>
                      {option.text}
                    </label>
                  </div>
                  <span className="text-[hsl(var(--foreground))] font-medium">{calculatePercentage(option.votes)}%</span>
                </div>
                <div className="w-full bg-[hsl(var(--muted))] rounded-full h-2.5 mt-2">
                  <div
                    className="bg-[hsl(var(--primary))] h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${calculatePercentage(option.votes)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1 text-right">{option.votes} votes</div>
              </div>
            ))}
          </div>

          {!hasVoted ? (
            <Button 
              onClick={handleVote} 
              disabled={!selectedOption}
              className="mt-6 w-full sm:w-auto"
              isLoading={false}
            >
              Submit Vote
            </Button>
          ) : (
            <div className="mt-6 p-4 bg-[hsl(var(--success)/0.2)] text-[hsl(var(--success))] rounded-md animate-slide-up flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Thank you for voting! Your vote has been recorded.
            </div>
          )}

          <div className="mt-6 text-sm text-[hsl(var(--muted-foreground))]">
            Total votes: {poll.totalVotes}
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}