import { merge } from "@keegancodes/foundations";
import { GeistSans } from "geist/font/sans";
import Link from "next/link";

export default function ErrorPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const { message } = searchParams;
  const errorMessage = decodeURIComponent(message);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 sm:p-12 md:p-24 w-full pb-16">
      <div
        className={merge(
          "z-10 w-full max-w-2xl flex flex-col items-center bg-black/20 backdrop-blur-md text-white p-6 rounded-xl border border-white/10 shadow-xl",
          GeistSans.className
        )}
      >
        <h1 className="text-center font-bold text-2xl pb-4 pt-2 text-red-400">
          Something went wrong
        </h1>
        <div className="w-full bg-red-500/10 border border-red-500/25 rounded-lg p-4 mb-6">
          <p className="text-sm text-white/80 leading-relaxed">{errorMessage}</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/"
            className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors whitespace-nowrap"
          >
            Try Again
          </Link>
        </div>
      </div>
    </main>
  );
}
