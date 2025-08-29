'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600 mb-4">Poll not found</h3>
          <p className="text-gray-500 mb-6">The poll you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/polls"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Polls
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/polls"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Polls
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{poll.title}</h1>
          <p className="text-gray-600 mb-4">{poll.description}</p>
          <p className="text-sm text-gray-500 mb-6">Created on {formatDate(poll.createdAt)}</p>

          <div className="space-y-4">
            {poll.options.map((option) => (
              <div key={option.id} className="border border-gray-200 rounded-md p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {!hasVoted && (
                      <input
                        type="radio"
                        id={option.id}
                        name="poll-option"
                        value={option.id}
                        checked={selectedOption === option.id}
                        onChange={() => setSelectedOption(option.id)}
                        className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                    )}
                    <label htmlFor={option.id} className="text-gray-900">{option.text}</label>
                  </div>
                  <span className="text-gray-700 font-medium">{calculatePercentage(option.votes)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${calculatePercentage(option.votes)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1 text-right">{option.votes} votes</div>
              </div>
            ))}
          </div>

          {!hasVoted ? (
            <button
              onClick={handleVote}
              disabled={!selectedOption}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Submit Vote
            </button>
          ) : (
            <div className="mt-6 p-4 bg-green-50 text-green-800 rounded-md">
              Thank you for voting! Your vote has been recorded.
            </div>
          )}

          <div className="mt-6 text-sm text-gray-500">
            Total votes: {poll.totalVotes}
          </div>
        </div>
      </div>
    </div>
  );
}