import { ClientProviders } from "./(root)/_components/client-providers";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter ({ subsets: ["latin"] });

export const metadata = {
  title: "Eurbnb central and simple",
  description: "Eurbnb central and simple apartments for rent",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
