"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function EarlyAccess() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would send this to your backend
    console.log("Email submitted:", email);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="container py-16 md:py-24 bg-muted/30 rounded-lg my-16">
      <div className="mx-auto max-w-[58rem] text-center">
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
          Limited Beta Access
        </div>
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-4xl mb-6">
          Be Among the First to Access H1BHub
        </h2>
        <p className="text-muted-foreground sm:text-lg mb-8 max-w-[42rem] mx-auto">
          We&apos;re inviting a limited number of H1B job seekers and
          information providers to join our platform.
        </p>

        {submitted ? (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="font-medium text-lg mb-2">
              Thank you for your interest!
            </h3>
            <p className="text-muted-foreground">
              We&apos;ve added you to our waitlist and will be in touch soon.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit">Join Waitlist</Button>
          </form>
        )}
      </div>
    </section>
  );
}
