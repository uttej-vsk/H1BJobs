"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("analytics-consent");
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("analytics-consent", "accepted");
    setShowConsent(false);
    // Reload the page to enable analytics
    window.location.reload();
  };

  const handleDecline = () => {
    localStorage.setItem("analytics-consent", "declined");
    setShowConsent(false);
    // Reload the page to disable analytics
    window.location.reload();
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#050e1d]/95 backdrop-blur-sm border-t border-gray-800 p-4 z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-300">
          We use analytics to improve your experience. By continuing to use our
          site, you agree to our{" "}
          <a
            href="/privacy"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Privacy Policy
          </a>
          .
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleDecline}
            className="bg-transparent border-gray-700 hover:bg-gray-800"
          >
            Decline
          </Button>
          <Button onClick={handleAccept}>Accept</Button>
        </div>
      </div>
    </div>
  );
}
