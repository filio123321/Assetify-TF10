import { Providers } from "@/providers";
// import { AccountProvider } from "@/context/context";
import AppProvider from "@/context/context";
import { Inter } from "next/font/google";
import { Zen_Dots } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

import NavigationBar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });
const zendots = Zen_Dots({ subsets: ["latin"], weight: ['400'] });


export const metadata = {
  title: "Assetify",
  description: "Blockchain real world asset marketplace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      {/* <body className={inter.className}> */}
      <body className={zendots.className}>
        <AppProvider>
          <Providers>
            <NavigationBar />


            {children}
            <Analytics />
          </Providers>
        </AppProvider>
      </body>
    </html>
  );
}
