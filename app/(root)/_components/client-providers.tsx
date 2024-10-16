'use client';

import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import { ConvexProvider, ConvexReactClient } from "convex/react";


// Kontrollera Convex URL
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!convexUrl) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL is not set. Please check your environment variables.");
}

const convex = new ConvexReactClient(convexUrl);

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ConvexProvider client={convex}>
        {/* <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
        <SignOutButton />
        </SignedIn> */}
        {children}
      </ConvexProvider>
    </ClerkProvider>
  );
}
