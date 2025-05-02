import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ReduxProvider from "@/providers/ReduxProvider";
import Header from "@/components/global/Header/page";
import Loader from "@/providers/Loader";
import logo from '../../public/Images/Jira_Logo.svg';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jira Clone",
  description: "Your collaborative issue tracker",
  icons: {
    icon: logo.src
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <Header />
          <Loader>
          {children}
          </Loader>
        </ReduxProvider>
      </body>
    </html>
  );
}