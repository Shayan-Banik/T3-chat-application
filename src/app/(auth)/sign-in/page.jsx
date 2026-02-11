"use client";

import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn.email({
        email,
        password,
      });
      if (result.error) {
        setError(result.error.message || "SignIn failed");
      } else {
        router.push("/");
      }
    } catch (error) {
      setError("An error occured during signin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Login
          </CardTitle>
          <CardDescription className="text-center">
            Sign in below (we&apos;ll increase your message limits if you do 😉)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Email Input */}
          <form onSubmit={handleEmailSignIn}>
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="max-w-sm mt-1 w-full px-4 py-3 rounded-md border"
            />

            {/* Password Input */}
            <input
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="max-w-sm mt-3 w-full px-4 py-3 rounded-md border"
            />
            {error && <p className="text-red-500">{error}</p>}

            {/* Email Sign In Button */}
            <Button
              className="max-w-sm mt-4 w-full px-7 py-6 cursor-pointer"
              type="submit"
              disabled={loading}>
              {loading ? "Signing in..." : "SignIn"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            className="max-w-sm -mt-2 w-full px-7 py-6 cursor-pointer"
            variant="outline"
            onClick={() =>
              signIn.social({
                provider: "github",
                callbackUrl: "/",
              })
            }>
            Sign In with GitHub
          </Button>
        </CardFooter>
        <div className="mt-4 space-y-2 text-center text-sm">
          <Link
            href="/forget-password"
            className="text-primary hover:underline">
            Forgot your password?
          </Link>
          <div className="">
            <Link
              href="/sign-up"
              className="hover:underline hover:text-primary">
              Don&apos;t have an account? SignUp
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SignInPage;
