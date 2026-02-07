"use client";

import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { signIn, signUp } from "@/lib/auth-client";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password and Confirm Password do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      const result = await signUp.email({
        name,
        email,
        password,
      });
      if (result.error) {
        setError(result.error.message || "SignUp failed");
      } else {
        router.push("/sign-in");
      }
    } catch (error) {
      setError("An error occured during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Sign Up
          </CardTitle>
          <CardDescription className="text-center">
            Create a new account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Email Input */}
          <form onSubmit={handleEmailSignUp}>
            <input
              type="name"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="max-w-sm mt-1 w-full px-4 py-3 rounded-md border"
            />
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

            {/* Confirm Password Input */}
            <input
              type="password"
              placeholder="Confirm your password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="max-w-sm mt-3 w-full px-4 py-3 rounded-md border"
            />

            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Email Sign In Button */}
            <Button
              className="max-w-sm mt-4 w-full px-7 py-6 cursor-pointer"
              type="submit"
              disabled={loading}>
              {loading ? "Signup in..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>

        <CardFooter>
          <Button
            className="max-w-sm w-full -mt-2 px-7 py-6 cursor-pointer"
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
          <div className="">
            <Link
              href="/sign-in"
              className="hover:underline  hover:text-primary">
              Already have an account? SignIn
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SignUpPage;
