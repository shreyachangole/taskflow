import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckSquare, 
  Calendar, 
  Users, 
  BarChart3, 
  Smartphone, 
  Shield,
  Zap,
  Globe,
  Bell
} from "lucide-react";

const features = [
  {
    icon: CheckSquare,
    title: "Smart Task Management",
    description: "Organize tasks with priorities, categories, and due dates. Never miss important deadlines again.",
    badge: "Core"
  },
  {
    icon: Calendar,
    title: "Calendar Integration",
    description: "Sync with your favorite calendar apps and visualize your tasks in timeline view.",
    badge: "Popular"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share tasks with team members, assign responsibilities, and track progress together.",
    badge: "Pro"
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Track your productivity with detailed analytics and performance insights.",
    badge: "Analytics"
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    description: "Access your tasks anywhere with our responsive design and mobile apps.",
    badge: "Mobile"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is encrypted and secure. We never share your personal information.",
    badge: "Security"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for speed with instant sync across all your devices.",
    badge: "Performance"
  },
  {
    icon: Globe,
    title: "Offline Support",
    description: "Work offline and sync automatically when you're back online.",
    badge: "Offline"
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Get reminded at the right time with intelligent notification system.",
    badge: "AI"
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="container space-y-6 bg-black py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4">
        <h2 className="text-center text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl text-white">
          Everything you need to stay <span className="text-blue-400">organized</span>
        </h2>
        <p className="max-w-[85%] text-center text-gray-400 sm:text-lg">
          TaskFlow comes with all the features you need to manage your tasks efficiently 
          and boost your productivity.
        </p>
      </div>
      
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="relative overflow-hidden border-gray-800 bg-gray-900/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed text-gray-400">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
