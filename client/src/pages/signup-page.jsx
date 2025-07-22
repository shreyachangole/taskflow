import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SignupForm } from "@/components/auth/signup-form";

export function SignupPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar isAuthenticated={false} />
      
      <main className="flex-1 flex items-center justify-center py-8">
        <div className="w-full max-w-lg">
          <SignupForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
