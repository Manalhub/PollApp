'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Container } from '@/components/ui/container';

type PollOption = {
  id: string;
  text: string;
};

export default function CreatePollPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState<PollOption[]>([
    { id: '1', text: '' },
    { id: '2', text: '' },
  ]);
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOptionChange = (id: string, value: string) => {
    setOptions(options.map(option => 
      option.id === id ? { ...option, text: value } : option
    ));
  };

  const addOption = () => {
    const newId = (options.length + 1).toString();
    setOptions([...options, { id: newId, text: '' }]);
  };

  const removeOption = (id: string) => {
    if (options.length <= 2) {
      setError('A poll must have at least 2 options');
      return;
    }
    setOptions(options.filter(option => option.id !== id));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (!title.trim()) {
      setError('Please enter a poll title');
      return;
    }

    if (!description.trim()) {
      setError('Please enter a poll description');
      return;
    }

    const filledOptions = options.filter(option => option.text.trim() !== '');
    if (filledOptions.length < 2) {
      setError('Please provide at least 2 options');
      return;
    }
    
    if (!endDate) {
      setError('Please select an end date for your poll');
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API call
      console.log('Creating poll:', {
        title,
        description,
        options: filledOptions
      });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirect to polls page after successful creation
      router.push('/polls');
    } catch (error) {
      console.error('Error creating poll:', error);
      setError('Failed to create poll. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <Container size="small" className="py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-2 text-gradient animate-slide-up">Create a New Poll</h1>
      <p className="text-[hsl(var(--muted-foreground))] mb-8 animate-slide-up" style={{animationDelay: '50ms'}}>Create an engaging poll with multiple options</p>

      <Card className="shadow-lg overflow-hidden">
        <CardHeader className="sm:flex-row sm:items-center justify-between">
          <div>
            <CardTitle className="animate-slide-up">Poll Details</CardTitle>
            <CardDescription className="animate-slide-up" style={{animationDelay: '50ms'}}>Fill in the information below to create your poll</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-6 p-4 bg-[hsl(var(--destructive)/0.1)] border border-[hsl(var(--destructive))] text-[hsl(var(--destructive))] rounded-lg flex items-center animate-pulse-subtle">
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="flex-1">{error}</span>
              </div>
            )}

            <div className="mb-6 animate-slide-up" style={{animationDelay: '100ms'}}>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Poll Title <span className="text-[hsl(var(--destructive))]">*</span>
              </label>
              <Input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a clear, specific question"
                required
                className="transition-all focus:border-primary w-full"
              />
            </div>

            <div className="mb-6 animate-slide-up" style={{animationDelay: '150ms'}}>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description <span className="text-[hsl(var(--destructive))]">*</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-[hsl(var(--border))] bg-[hsl(var(--background))] rounded-lg focus-ring transition-all focus:border-primary"
                placeholder="Provide context or additional information about your poll"
                required
              />
            </div>
            
            <div className="mb-6 animate-slide-up" style={{animationDelay: '200ms'}}>
              <label htmlFor="endDate" className="block text-sm font-medium mb-1">
                Poll End Date <span className="text-[hsl(var(--destructive))]">*</span>
              </label>
              <Input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
                className="transition-all focus:border-primary w-full"
              />
            </div>

            <div className="mb-6 animate-slide-up" style={{animationDelay: '250ms'}}>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3">
                <label className="block text-sm font-medium">
                  Poll Options <span className="text-[hsl(var(--destructive))]">*</span>
                </label>
                <span className="text-xs text-[hsl(var(--muted-foreground))]">Minimum 2 options required</span>
              </div>
              
              <div className="space-y-3 bg-[hsl(var(--muted)/0.3)] p-4 rounded-lg">
                {options.map((option) => (
                  <div key={option.id} className="flex items-center gap-2 group transition-all hover:bg-[hsl(var(--muted)/0.2)] p-1 rounded-md">
                    <div className="w-8 h-8 rounded-full bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] flex items-center justify-center font-medium flex-shrink-0">
                      {option.id}
                    </div>
                    <Input
                      type="text"
                      value={option.text}
                      onChange={(e) => handleOptionChange(option.id, e.target.value)}
                      className="flex-1 transition-all focus:border-primary"
                      placeholder={`Option ${option.id}`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeOption(option.id)}
                      className="w-8 h-8 rounded-full bg-[hsl(var(--destructive)/0.1)] text-[hsl(var(--destructive))] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                      aria-label="Remove option"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="ghost"
                onClick={addOption}
                className="mt-3 inline-flex items-center text-sm hover:bg-primary/5 transition-colors"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Another Option
              </Button>
            </div>

          </form>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row items-center justify-end space-y-4 sm:space-y-0 sm:space-x-4 border-t border-[hsl(var(--border))] pt-4">
          <Button
            variant="outline"
            onClick={() => router.push('/polls')}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            onClick={handleSubmit}
            className="w-full sm:w-auto animate-pulse-subtle"
          >
            Create Poll
          </Button>
        </CardFooter>
      </Card>
    </Container>
  );
}