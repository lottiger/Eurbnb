import { SignIn } from "@clerk/nextjs";
import type { NextPage } from "next";

const SignInPage: NextPage = () => {
  return <SignIn path="/sign-in" />;
};

export default SignInPage;
