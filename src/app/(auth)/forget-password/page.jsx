"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { forgetPassword } from "@/lib/auth-client";
import Link from "next/link";

import { useState } from "react";

import React from "react";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailLForgot = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await forgetPassword({
        email,
        redirectTo: "/reset-password",
      });
      if (result.error) {
        setError(result.error.message || "Failed to send reset email 🥲");
      } else {
        setSuccess(true);
        console.log("Passwoed reset email sent to", email);
      }
    } catch (error) {
      setError("An error occured during forgot password try again");
    } finally {
      setLoading(false);
    }
  };

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
          {success ? (
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  Password reset link sent to email. Check the console for the
                  reset URL (in production, this would be sent via email).
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            // {/* Email Input */}
            <form onSubmit={handleEmailLForgot}>
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
              >
                {loading ? "Sending..." : "Sending Reset Link"}
              </Button>
              <Button className="bg-gray-100 text-black mt-2 max-w-sm w-full px-7 py-5 cursor-pointer hover:bg-gray-100">
                <Link href="/sign-in">Back to SignIn</Link>
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgetPasswordPage;
