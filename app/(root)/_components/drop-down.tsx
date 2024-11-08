"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs"; // Importera Clerk hooks och komponenter

const DropdownMenu = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { isSignedIn } = useUser(); // Clerk's hook to check if the user is signed in
  const dropdownRef = useRef<HTMLUListElement | null>(null); // Skapa ref för dropdown

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const navigateTo = (path: string) => {
    setIsOpen(false); // Stänger dropdown-menyn när man navigerar
    router.push(path); // Använd router.push för att navigera
  };

  // Hantera klick utanför dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false); // Stäng dropdown om klickat utanför
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center w-full rounded-md border-none focus:outline-none"
      >
        <Menu size={48} strokeWidth={1} className="" />
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
              <SignOutButton>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Logga ut
                </button>
              </SignOutButton>
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