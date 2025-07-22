import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LoginForm } from "@/components/login-form";

export function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar isAuthenticated={false} />
      
      <main className="flex-1 flex items-center justify-center py-8">
        <div className="w-full max-w-lg">
          <LoginForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
