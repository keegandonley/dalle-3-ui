import { merge } from "@keegancodes/foundations";
import { GeistSans } from "geist/font/sans";
import Link from "next/link";

export default function RedeemPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const { imageUrl, resolution, model, quality } = searchParams;
  const downloadUrl = decodeURIComponent(imageUrl);

  let width = 1792;
  let height = 1024;
  const isAutoResolution = !resolution || resolution === "auto";

  if (!isAutoResolution) {
    const [w, h] = resolution.split("x").map((v) => parseInt(v, 10));
    if (w && h) {
      width = w;
      height = h;
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 sm:p-12 md:p-24 w-full pb-16">
      <div
        className={merge(
          "z-10 w-full max-w-4xl flex flex-col items-center bg-black/20 backdrop-blur-md text-white p-6 rounded-xl border border-white/10 shadow-xl",
          GeistSans.className
        )}
      >
        <div className="w-full flex items-center justify-between mb-2">
          <Link
            href="/"
            className="text-sm text-white/50 hover:text-white/80 transition-colors"
          >
            ← Generate another
          </Link>
        </div>

        <h1 className="text-center font-bold text-2xl py-4 w-full">
          Generated Image
        </h1>

        <p className="pb-5 text-sm text-white/60 leading-relaxed w-full">
          Download the image to save a local copy — it may be deleted from our
          servers after 30 days. Bookmark this page if you&apos;d like to
          return. Anyone with this link can view the image.
        </p>

        <div className="flex flex-wrap gap-2 pb-5 w-full">
          <span className="text-xs text-white/60 bg-black/30 border border-white/10 px-3 py-1.5 rounded-lg">
            Resolution: {isAutoResolution ? "auto" : `${width}×${height}`}
          </span>
          <span className="text-xs text-white/60 bg-black/30 border border-white/10 px-3 py-1.5 rounded-lg">
            Model: {model}
          </span>
          <span className="text-xs text-white/60 bg-black/30 border border-white/10 px-3 py-1.5 rounded-lg">
            Quality: {quality}
          </span>
        </div>

        <div className="w-full rounded-lg overflow-hidden shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            width={width}
            height={height}
            src={downloadUrl}
            alt="Generated Image"
            className="w-full h-auto"
          />
        </div>

        <div className="pt-6 flex flex-col items-center gap-3">
          <div className="flex gap-3">
            <a
              href={downloadUrl}
              download
              className="inline-flex items-center justify-center h-10 bg-blue-500 hover:bg-blue-400 text-white font-semibold px-6 rounded-lg transition-colors whitespace-nowrap"
            >
              Download Image
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center h-10 bg-white/10 hover:bg-white/20 text-white font-semibold px-4 rounded-lg transition-colors whitespace-nowrap"
            >
              Generate Another
            </Link>
          </div>
          <p className="text-xs text-white/40">
            a project by{" "}
            <Link
              href="https://keegan.codes"
              className="text-yellow-400/60 hover:text-yellow-400 transition-colors"
              target="_blank"
            >
              keegan.codes
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
