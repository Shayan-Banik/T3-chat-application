"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import { useState } from "react";

import React from "react";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = () => {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email to receive a link to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Email Input */}
          <form>
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="max-w-sm mt-1 w-full px-4 py-3 rounded-md border"
            />
            {error && <p className="text-red-500">{error}</p>}

            {/* Email Sign In Button */}
            <Button
              className="max-w-sm mt-4 w-full px-7 py-5 cursor-pointer"
              type="submit"
              disabled={loading}
              onClick={handleEmailLogin}>
              {loading ? "Sending..." : "Sending Reset Link"}
            </Button>
            <Button className="bg-gray-100 text-black mt-2 max-w-sm w-full px-7 py-5 cursor-pointer hover:bg-gray-100">
              <Link href="/sign-in">Back to SignIn</Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgetPasswordPage;
