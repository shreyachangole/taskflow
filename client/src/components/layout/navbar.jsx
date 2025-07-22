import { useState } from "react";
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

export function Navbar({ isAuthenticated = false, user = null }) {
  const [isOpen, setIsOpen] = useState(false);

  // Simple navigation function
  const navigate = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const NavLinks = () => (
    <>
      {/* Navigation links removed as requested */}
    </>
  );

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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-14 items-center">
        {/* Logo */}
        <div className="mr-4 flex">
          <button onClick={() => navigate('/')} className="mr-6 flex items-center space-x-2 cursor-pointer">
            <CheckSquare className="h-6 w-6 text-blue-400" />
            <span className="hidden font-bold text-white sm:inline-block">TaskFlow</span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="mr-4 hidden md:flex">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {!isAuthenticated && <NavLinks />}
          </nav>
        </div>

        {/* Right side */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Desktop Auth/User Menu */}
          <nav className="hidden md:flex">
            {isAuthenticated ? <UserMenu /> : <AuthButtons />}
          </nav>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <a onClick={() => navigate('/')} className="flex items-center space-x-2 cursor-pointer">
                <CheckSquare className="h-6 w-6 text-blue-400" />
                <span className="font-bold text-white">TaskFlow</span>
              </a>
              <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                <div className="flex flex-col space-y-3">
                  {!isAuthenticated && (
                    <>
                      <NavLinks />
                      <div className="flex flex-col space-y-2 pt-4">
                        <Button variant="ghost" onClick={() => navigate('/login')} className="text-gray-300 hover:text-white hover:bg-gray-800">
                          Sign In
                        </Button>
                        <Button onClick={() => navigate('/signup')} className="bg-blue-600 hover:bg-blue-700 text-white">
                          Get Started
                        </Button>
                      </div>
                    </>
                  )}
                  {isAuthenticated && (
                    <div className="flex flex-col space-y-3">
                      <a href="/dashboard" className="text-sm font-medium">
                        Dashboard
                      </a>
                      <a href="/profile" className="text-sm font-medium">
                        Profile
                      </a>
                      <a href="/settings" className="text-sm font-medium">
                        Settings
                      </a>
                      <Button variant="ghost" className="justify-start px-0">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
