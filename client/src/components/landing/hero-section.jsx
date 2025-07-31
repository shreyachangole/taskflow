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
    <section className="container relative bg-black">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
        {/* Badge */}
        <Badge variant="outline" className="mb-4 bg-blue-600 border-blue-600 text-white">
          <Star className="mr-1 h-3 w-3" />
          Completely Free Forever
        </Badge>

        {/* Heading */}
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] text-white">
          Organize your tasks.{" "}
          <span className="text-blue-400">Boost productivity.</span>
        </h1>

        {/* Subheading */}
        <p className="max-w-[750px] text-center text-lg text-gray-400 sm:text-xl">
          TaskFlow helps you manage your daily tasks, set priorities, and achieve your goals 
          with a beautiful and intuitive interface. No hidden costs, no limitations.
        </p>

        {/* CTA Buttons */}
        <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
          <Button size="lg" className="h-11 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => navigate('/signup')}>
            Get Started Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="h-11 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
            <Play className="mr-2 h-4 w-4" />
            Watch Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-8 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-white">10K+</span>
            <span>Active Users</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-white">1M+</span>
            <span>Tasks Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-white">100%</span>
            <span>Free Forever</span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative mx-auto max-w-5xl">
        <div className="relative rounded-xl border border-gray-800 bg-gray-900 shadow-2xl">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20" />
          <img
            src="/api/placeholder/1200/600"
            alt="TaskFlow Dashboard Preview"
            className="relative rounded-xl opacity-90"
          />
        </div>
      </div>
    </section>
  );
}
