import type { Metadata } from "next";
import {  Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "DOST-STII | S&T Information Is Our Business",
  description: "The Department of Science and Technology - Science and Technology Information Institute (DOST-STII) serves as the information and communication arm of DOST, promoting science, technology, and innovation in the Philippines through knowledge sharing, publications, and digital resources.",
  icons: {
    icon: "/logo.png", // ✅ or "/logo.png" if that’s your preferred file
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
        className={`${geistSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
