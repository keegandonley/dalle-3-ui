import type { Metadata } from "next";
import "./globals.css";

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
      </body>
    </html>
  );
}
