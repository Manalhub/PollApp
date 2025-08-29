'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Available Polls</h1>
        <Link
          href="/create-poll"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Create New Poll
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : polls.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {polls.map((poll) => (
            <div
              key={poll.id}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{poll.title}</h2>
                <p className="text-gray-600 mb-4">{poll.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{formatDate(poll.createdAt)}</span>
                  <span>{poll.votesCount} votes</span>
                </div>
              </div>
              <div className="border-t border-gray-200 bg-gray-50 px-6 py-3">
                <Link
                  href={`/polls/${poll.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Poll &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600 mb-4">No polls available yet</h3>
          <p className="text-gray-500 mb-6">Be the first to create a poll!</p>
          <Link
            href="/create-poll"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Create New Poll
          </Link>
        </div>
      )}
    </div>
  );
}