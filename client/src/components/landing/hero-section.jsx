import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Star } from "lucide-react";

export function HeroSection() {
  // Simple navigation function
  const navigate = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <section className="container relative">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
        {/* Badge */}
        <Badge variant="outline" className="mb-4">
          <Star className="mr-1 h-3 w-3" />
          New: AI-powered task suggestions
        </Badge>

        {/* Heading */}
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          Organize your tasks.{" "}
          <span className="text-primary">Boost productivity.</span>
        </h1>

        {/* Subheading */}
        <p className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
          TaskFlow helps you manage your daily tasks, set priorities, and achieve your goals 
          with a beautiful and intuitive interface.
        </p>

        {/* CTA Buttons */}
        <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
          <Button size="lg" className="h-11" onClick={() => navigate('/signup')}>
            Get Started Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="h-11">
            <Play className="mr-2 h-4 w-4" />
            Watch Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-8 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-foreground">10K+</span>
            <span>Active Users</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-foreground">1M+</span>
            <span>Tasks Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-foreground">99.9%</span>
            <span>Uptime</span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative mx-auto max-w-5xl">
        <div className="relative rounded-xl border bg-background shadow-2xl">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20" />
          <img
            src="/api/placeholder/1200/600"
            alt="TaskFlow Dashboard Preview"
            className="relative rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
