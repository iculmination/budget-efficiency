import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const RootPage = () => {
  return (
    <div className="">
      <SignedOut>
        <SignInButton>Sign in</SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default RootPage;
