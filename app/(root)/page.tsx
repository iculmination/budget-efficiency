import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const RootPage = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 text-gray-800">
      <header className="absolute top-6 left-10">
        <h2 className="text-2xl font-bold tracking-tight cursor-default">
          <span className="text-blue-600 cursor-default">Budget</span>Master
        </h2>
      </header>

      <main className="text-center max-w-lg">
        <h1 className="text-5xl font-extrabold mb-4">
          Take Control of Your Finances
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Track expenses, set budgets, and achieve your financial goals
          effortlessly.
        </p>

        <div className="flex justify-center gap-4">
          <SignedOut>
            <SignInButton>
              <Button className="px-6 py-3shadow-md" size="lg">
                Get Started
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/main">
              <Button
                variant="secondary"
                className="px-6 py-3 shadow-md"
                size="lg"
              >
                Go to Dashboard
              </Button>
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </main>
    </div>
  );
};

export default RootPage;
