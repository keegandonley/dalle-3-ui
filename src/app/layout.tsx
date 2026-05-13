import type { Metadata } from "next";
import "./globals.css";
import { merge } from "@keegancodes/foundations";
import { Analytics } from "@vercel/analytics/react";
import { TailwindDebugger } from "@keegancodes/foundations-react/client";

export const metadata: Metadata = {
  title: "OpenAI Image Generator",
  description:
    "A UI to generate images using OpenAI image models, with your own API key",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="from-blue-950 to-blue-700 bg-gradient-to-br">
        {children}
        {process.env.NODE_ENV === "development" ? <TailwindDebugger /> : null}
      </body>

      <Analytics />
    </html>
  );
}
