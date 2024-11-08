import { ClientProviders } from "./(root)/_components/client-providers";
import "./globals.css";
import { Inter } from "next/font/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./(root)/_components/footer";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ClientProviders>
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}