import { CheckSquare, Github, Linkedin, Mail, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <CheckSquare className="h-8 w-8 text-blue-400" />
              <span className="font-bold text-2xl">TaskFlow</span>
              <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">Beta</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              Empowering developers with a comprehensive platform for task management, 
              productivity tracking, and collaborative planning. Join our community and 
              enhance your workflow efficiency.
            </p>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
              >
                <Star className="h-4 w-4 mr-2" />
                Star on GitHub
              </Button>
              <Button 
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Zap className="h-4 w-4 mr-2" />
                Contribute
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <span className="text-gray-400">🏠</span>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-gray-400">💻</span>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Dashboard
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-gray-400">💝</span>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-gray-400">⚡</span>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Features
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Connect</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3">
                <Github className="h-4 w-4 text-gray-400" />
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  GitHub
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Linkedin className="h-4 w-4 text-gray-400" />
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Email
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-gray-400 font-mono text-sm">Be</span>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Behance
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>© 2025 TaskFlow. All rights reserved.</span>
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
            </div>
            <div className="text-sm text-gray-400">
              Crafted with <span className="text-red-500">❤️</span> by{" "}
              <a 
                href="#" 
                className="text-orange-400 hover:text-orange-300 transition-colors font-medium"
              >
                Sagar Waghmare
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
