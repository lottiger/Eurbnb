"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { useUser, useClerk, SignInButton } from "@clerk/nextjs"; // Importera useClerk
import toast, { Toaster } from "react-hot-toast";

const DropdownMenu = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { signOut } = useClerk(); // Använd useClerk för att få åtkomst till signOut
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const navigateTo = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  const handleSignOut = async () => {
    await signOut(); // Använd Clerk's signOut-funktion för att logga ut användaren
    toast.success("Du har blivit utloggad"); // Visa toast-meddelandet efter utloggning
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative inline-block text-left">
      <Toaster position="top-center" reverseOrder={false} />
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center w-full rounded-md border-none focus:outline-none focus:ring-2 focus:ring-gray-700"
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : "false"}
        aria-controls="dropdown-menu"
      >
        <Menu size={48} strokeWidth={1} aria-hidden="true" />
        <span className="sr-only">Open menu</span>
      </button>

      {isOpen && (
        <ul ref={dropdownRef} className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white focus:outline-none z-10">
          <li className="pb-1 pt-4">
            <button
              onClick={() => navigateTo("/")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Hem
            </button>
          </li>
          <li className="py-1">
            <button
              onClick={() => navigateTo("/favorites")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Favoriter
            </button>
          </li>
          <li className="py-1">
            <button
              onClick={() => navigateTo("/bookings")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Mina Bokningar
            </button>
          </li>

          {isSignedIn ? (
            <li className="pt-1 pb-4">
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logga ut
              </button>
            </li>
          ) : (
            <li className="pt-1 pb-4">
              <SignInButton>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Logga in
                </button>
              </SignInButton>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
