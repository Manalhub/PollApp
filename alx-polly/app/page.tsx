import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background to-background/80">
        <Container>
          <div className="flex flex-col items-center text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
              Welcome to <span className="text-gradient">Polly</span>
            </h1>
            <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
              Create and participate in polls with our easy-to-use polling application.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="animate-slide-up" style={{animationDelay: '100ms'}}>
                <Link href="/polls">View Polls</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="animate-slide-up" style={{animationDelay: '200ms'}}>
                <Link href="/create-poll">Create a Poll</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 md:py-24 bg-muted/50">
        <Container>
          <h2 className="text-3xl font-bold mb-10 text-center">Why Choose <span className="text-gradient">Polly</span>?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in" style={{animationDelay: '100ms'}}>
              <div className="p-8">
                <div className="mb-4 p-3 bg-primary/10 inline-block rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Create</h3>
                <p className="text-muted-foreground">Create custom polls with multiple options and set duration. Easy to use interface for all your polling needs.</p>
              </div>
            </Card>
            
            {/* Feature 2 */}
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in" style={{animationDelay: '200ms'}}>
              <div className="p-8">
                <div className="mb-4 p-3 bg-primary/10 inline-block rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Share</h3>
                <p className="text-muted-foreground">Share your polls with friends, colleagues, or the public. Multiple sharing options available.</p>
              </div>
            </Card>
            
            {/* Feature 3 */}
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in" style={{animationDelay: '300ms'}}>
              <div className="p-8">
                <div className="mb-4 p-3 bg-primary/10 inline-block rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M3 3v18h18"></path>
                    <path d="M18 9l-6-6-7 7"></path>
                    <path d="M14 10l2-2-2-2"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Analyze</h3>
                <p className="text-muted-foreground">View real-time results and analyze voting patterns with beautiful visualizations and insights.</p>
              </div>
            </Card>
          </div>
        </Container>
      </section>
      
      {/* Call to Action */}
      <section className="w-full py-16 md:py-24">
        <Container size="small">
          <Card className="mt-10 p-10 bg-accent rounded-2xl w-full shadow-md animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-center">Ready to get started?</h2>
            <p className="mb-6 text-muted-foreground max-w-xl mx-auto text-center">
              Join thousands of users who are already creating and participating in polls with Polly.
            </p>
            <div className="flex justify-center">
              <Button size="lg" asChild className="animate-pulse-subtle">
                <Link href="/create-poll">Create Your First Poll</Link>
              </Button>
            </div>
          </Card>
        </Container>
      </section>
    </main>
  );
}
