"use client";

import * as React from "react";

export function SkipLink() {
  return (
    <a 
      href="#main-content" 
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-background px-4 py-2 text-sm font-medium text-foreground shadow-md focus-ring"
    >
      Skip to main content
    </a>
  );
}