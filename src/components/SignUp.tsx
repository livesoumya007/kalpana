import React from "react";
import { Icons } from "./Icons";
import UserAuthForm from "./UserAuthForm";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Sign up for KALPANA
        </h1>
        <p className="text-sm max-w-sm mx-auto">
          By continuing, you are setting up a Kalpana account and agree to our
          User Agreement and Privacy Policy
        </p>
        {/* SignIn form */}
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-zinc-700">
          Already have an account ?{" "}
          <Link
            href="/sign-in"
            className="hover:text-zinc-800 text-sm underline underline-offset-4"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
