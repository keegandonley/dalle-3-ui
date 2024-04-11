import { merge } from "@keegancodes/foundations";
import { GeistSans } from "geist/font/sans";
import Image from "next/image";
import Link from "next/link";

export default function ErrorPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const { message } = searchParams;
  const errorMessage = decodeURIComponent(message);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 sm:p-12 md:p-24 w-full">
      <div
        className={merge(
          "z-10 w-full flex flex-col items-center bg-[rgba(0,0,0,0.2)] backdrop-blur-md text-white p-4 rounded-lg",
          GeistSans.className
        )}
      >
        <h1 className="text-center font-bold text-2xl pb-4 pt-2">Error</h1>
        <p className="pt-2 pb-6 text-left w-full">{errorMessage}</p>
        <Link
          href="/"
          className="whitespace-nowrap bg-[rgba(0,0,0,0.5)] p-2 rounded-lg hover:bg-[rgba(0,0,0,0.7)]"
        >
          Try Again
        </Link>
      </div>
    </main>
  );
}
