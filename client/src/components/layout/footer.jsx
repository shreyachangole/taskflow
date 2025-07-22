import { CheckSquare, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <CheckSquare className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">TaskFlow</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Organize your tasks, boost your productivity, and achieve your goals with TaskFlow.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </Button>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  API
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest updates and tips.
            </p>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter your email"
                type="email"
                className="flex-1"
              />
              <Button type="submit">Subscribe</Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:space-y-0">
          <div className="flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2025 TaskFlow. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
