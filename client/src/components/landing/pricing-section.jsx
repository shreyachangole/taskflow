import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Free",
    description: "Perfect for personal use",
    price: "$0",
    period: "forever",
    features: [
      "Up to 50 tasks",
      "Basic categories",
      "Mobile app access",
      "Email support",
      "Basic analytics"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Pro",
    description: "Best for professionals",
    price: "$9",
    period: "per month",
    features: [
      "Unlimited tasks",
      "Advanced categories",
      "Team collaboration (up to 5 members)",
      "Priority support",
      "Advanced analytics",
      "Calendar integration",
      "Custom themes",
      "Export data"
    ],
    cta: "Start Pro Trial",
    popular: true
  },
  {
    name: "Team",
    description: "Perfect for growing teams",
    price: "$19",
    period: "per month",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Advanced permissions",
      "Team analytics",
      "API access",
      "Custom integrations",
      "24/7 phone support",
      "Advanced security"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="container space-y-6 py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4">
        <h2 className="text-center text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
          Simple, transparent pricing
        </h2>
        <p className="max-w-[85%] text-center text-muted-foreground sm:text-lg">
          Choose the plan that's right for you. Upgrade or downgrade at any time.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Most Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="flex items-baseline justify-center gap-1 pt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">/{plan.period}</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {plan.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </CardContent>

            <CardFooter>
              <Button 
                className="w-full" 
                variant={plan.popular ? "default" : "outline"}
                size="lg"
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mx-auto max-w-[980px] text-center">
        <p className="text-sm text-muted-foreground">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}
