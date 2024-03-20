import { Providers } from "@/providers";
import { AccountProvider } from "@/context/context";
import { Inter } from "next/font/google";
import "./globals.css";

import NavigationBar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AccountProvider>
          <Providers>
            <NavigationBar />
            {children}
          </Providers>
        </AccountProvider>
      </body>
    </html>
  );
}
