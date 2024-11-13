import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { StoreProvider } from "../store/storeProvider";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../components/site-navbar";
import Sidebar from "../components/site-sidebar";
import { ThemeProvider } from "next-themes";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Music Dashboard",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Theme>
          <ThemeProvider  attribute="class" defaultTheme="dark" disableTransitionOnChange>
            <StoreProvider>
              <div className="flex flex-row flex-1 h-screen text-white" style={{ fontFamily: "Poppins" }}>
                <Navbar />
                <div className="flex-1 w-7/12">
                  <div className="h-full bg-zinc-50 dark:bg-zinc-900 backdrop-blur">{children}</div>
                </div>
                <Sidebar />
              </div>
            </StoreProvider>
          </ThemeProvider>
        </Theme>
      </body>
    </html>
  );
}
