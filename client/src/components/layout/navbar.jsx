import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, CheckSquare, User, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { set } from "zod";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);



  // Simple navigation function
  const navigate = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };




  const AuthButtons = () => (
    <div className="flex items-center gap-2">
      <Button variant="ghost" onClick={() => navigate('/login')} className="text-gray-300 hover:text-white hover:bg-gray-800">
        Sign In
      </Button>
      <Button onClick={() => navigate('/signup')} className="bg-blue-600 hover:bg-blue-700 text-white">
        Get Started
      </Button>
    </div>
  );

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
  const loggedIn = !!token;
  const [user, setUser] = useState(null);
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };
  useEffect(() => {
    if (token) {
      axios.get('/api/auth/profile', axiosConfig)
        .then(res => setUser(res.data.data.user))
        .catch(err => console.error('Error fetching profile:', err));
    }
  }, []);
  const isLoggedIn = !!token;
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };
  // Profile picture initials
  const profileInitials=user?user.name.split(" ").map(name=> name.charAt(0).toUpperCase()).join(" ") : "S";


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side */}
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="lg:hidden p-2 rounded-md hover:bg-gray-700 mr-2"
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center focus:outline-none"
              aria-label="Go to home"
            >
              <CheckSquare className="text-blue-500 mr-2" size={24} />
              <span className="text-xl font-bold cursor-pointer">TaskFlow</span>
            </button>
          </div>

          {/* Center/Right */}
          {loggedIn ? (
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => navigate('/dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors`}
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate('/tasks')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors`}
              >
                My Tasks
              </button>
              <button
                onClick={() => navigate('/categories')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors`}
              >
                Categories
              </button>
            </div>
          ) : null}

          {/* Right side */}
          {/* Profile make it the initial into the profile picture */}
          <div className="flex items-center space-x-3">
            {loggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="w-8 h-8 cursor-pointer bg-blue-500 rounded-full flex items-center justify-center text-sm font-medium transition-transform duration-150 hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-blue-400"
                    style={{ zIndex: 60 }}
                    aria-label="Open profile menu"
                  >
                    {profileInitials}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gray-800 text-white" align="end" forceMount style={{ zIndex: 60 }}>
                  <DropdownMenuLabel className="font-normal ">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500 hover:bg-red-500 hover:text-white font-semibold">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => navigate('/login')} className="text-gray-300 hover:text-white hover:bg-gray-800">
                  Sign In
                </Button>
                <Button onClick={() => navigate('/signup')} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
