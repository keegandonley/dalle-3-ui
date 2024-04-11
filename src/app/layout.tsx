import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { merge } from "@keegancodes/foundations";

export const metadata: Metadata = {
  title: "DALL·E 3 UI",
  description:
    "A UI to generate images using the DALL·E 3 model, with your own API key",
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
        <div
          className={merge("fixed bottom-2 -right-1 sm:right-1 text-blue-500")}
          style={{ writingMode: "vertical-rl" }}
        >
          A project by{" "}
          <Link
            href="https://keegan.codes"
            className="text-yellow-600"
            target="_blank"
          >
            Keegan Donley
          </Link>
        </div>
      </body>
    </html>
  );
}
