'use client';

import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import {  ConvexReactClient } from "convex/react";


// Kontrollera Convex URL
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!convexUrl) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL is not set. Please check your environment variables.");
}

const convex = new ConvexReactClient(convexUrl);

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {/* <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
        <SignOutButton />
        </SignedIn> */}
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
