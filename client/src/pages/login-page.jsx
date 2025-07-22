import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LoginForm } from "@/components/auth/login-form";

export function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-black">
      <Navbar isAuthenticated={false} />
      
      <main className="flex-1 flex items-center justify-center py-8 bg-black">
        <div className="w-full max-w-lg">
          <LoginForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
