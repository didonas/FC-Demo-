"use client";

import React, { useState } from "react";

export const ShareButton: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="hover:text-copper transition-colors underline cursor-pointer"
    >
      {copied ? "Link Copied!" : "Copy Link"}
    </button>
  );
};
