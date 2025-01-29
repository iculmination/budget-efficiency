import {
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const RootPage = () => {
  return (
    <div className="">
      <SignedOut>
        <SignInButton>Sign in</SignInButton>
        {/* <SignIn /> */}
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default RootPage;
