import { CheckSquare, Github, Linkedin, Mail, Star, Zap, ExternalLink, Home, Monitor, Heart, Bolt } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container px-4 py-12 md:py-16">
        <div className="bg-gray-900/30 backdrop-blur-lg rounded-2xl border border-gray-800/50 p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <CheckSquare className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-2xl text-white">TaskFlow</span>
                <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full border border-blue-500/30">Beta</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-sm">
                Empowering developers with a comprehensive platform for task management, 
                productivity tracking, and collaborative planning. Join our community and 
                enhance your workflow efficiency.
              </p>
              <div className="flex space-x-3">
                <a 
                  href="https://github.com/SagarSuryakantWaghmare/taskflow"
                  target="_blank"
                  rel="noreferrer"
                  className="group"
                >
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-600/50 text-gray-300 hover:bg-gray-800/50 hover:text-white bg-transparent backdrop-blur-sm group-hover:border-yellow-500/50"
                  >
                    <Star className="h-4 w-4 mr-2 group-hover:text-yellow-500 transition-colors" />
                    Star on GitHub
                    <ExternalLink className="h-3 w-3 ml-2 opacity-60 group-hover:opacity-100" />
                  </Button>
                </a>
                <Button 
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 shadow-lg"
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
                <li className="flex items-center space-x-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gray-800/50 border border-gray-700/50 group-hover:border-blue-400/50 transition-all duration-200">
                    <Home className="h-4 w-4 text-blue-400" />
                  </div>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors group">
                    Home
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gray-800/50 border border-gray-700/50 group-hover:border-blue-400/50 transition-all duration-200">
                    <Monitor className="h-4 w-4 text-blue-400" />
                  </div>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors group">
                    Dashboard
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gray-800/50 border border-gray-700/50 group-hover:border-pink-500/50 transition-all duration-200">
                    <Heart className="h-4 w-4 text-blue-400" />
                  </div>
                  <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors group">
                    About
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gray-800/50 border border-gray-700/50 group-hover:border-yellow-500/50 transition-all duration-200">
                    <Bolt className="h-4 w-4 text-blue-400" />
                  </div>
                  <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors group">
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
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gray-800/50 border border-gray-700/50 group-hover:border-gray-600 transition-all duration-200">
                    <Github className="h-4 w-4 text-blue-400" />
                  </div>
                  <a 
                    href="https://github.com/SagarSuryakantWaghmare" 
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-300 hover:text-white transition-colors group"
                  >
                    GitHub
                    <ExternalLink className="h-3 w-3 ml-1 opacity-60 group-hover:opacity-100 inline" />
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gray-800/50 border border-gray-700/50 group-hover:border-blue-500/50 transition-all duration-200">
                    <Linkedin className="h-4 w-4 text-blue-400" />
                  </div>
                  <a 
                    href="https://linkedin.com/in/sagarwaghmare44" 
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-300 hover:text-blue-400 transition-colors group"
                  >
                    LinkedIn
                    <ExternalLink className="h-3 w-3 ml-1 opacity-60 group-hover:opacity-100 inline" />
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gray-800/50 border border-gray-700/50 group-hover:border-green-500/50 transition-all duration-200">
                    <Mail className="h-4 w-4 text-blue-400" />
                  </div>
                  <a 
                    href="mailto:sagarwaghmare1384@gmail.com" 
                    className="text-gray-300 hover:text-green-400 transition-colors group"
                  >
                    Email
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gray-800/50 border border-gray-700/50 group-hover:border-blue-400/50 transition-all duration-200">
                    <span className="text-blue-400 font-mono text-sm font-bold">Be</span>
                  </div>
                  <a 
                    href="https://www.behance.net/sagarwaghmare" 
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-300 hover:text-blue-400 transition-colors group"
                  >
                    Behance
                    <ExternalLink className="h-3 w-3 ml-1 opacity-60 group-hover:opacity-100 inline" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700/50 mt-8 pt-8">
            <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0">
              <div className="flex items-center space-x-4 text-sm text-gray-300">
                <span>© 2025 TaskFlow. All rights reserved.</span>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms
                </a>
              </div>
              <div className="text-sm text-gray-300">
                Crafted with <span className="text-red-500">❤️</span> by{" "}
                <a 
                  href="https://github.com/SagarSuryakantWaghmare" 
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors font-medium group"
                >
                  Sagar Waghmare
                  <ExternalLink className="h-3 w-3 ml-1 opacity-60 group-hover:opacity-100 inline" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
