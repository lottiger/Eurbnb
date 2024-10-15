
import { SignUp } from "@clerk/nextjs";
import type { NextPage } from "next";

const SignUpPage: NextPage = () => {
  return <SignUp path="/sign-up" />;
};

export default SignUpPage;