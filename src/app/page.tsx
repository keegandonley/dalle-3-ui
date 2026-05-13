import { CredentialsForm } from "@/components/Credentials";
import { PromptForm } from "@/components/Prompt";
import { merge } from "@keegancodes/foundations";
import { GeistSans } from "geist/font/sans";

export const maxDuration = 300;

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 sm:p-12 md:p-24 w-full pb-16">
      <div
        className={merge(
          "z-10 w-full max-w-2xl bg-black/20 backdrop-blur-md text-white p-6 rounded-xl border border-white/10 shadow-xl",
          GeistSans.className
        )}
      >
        <h1 className="font-bold text-2xl">OpenAI Image Generator</h1>
        <p className="mt-3 text-sm text-white/65 leading-relaxed">
          Generate images using OpenAI&apos;s GPT image models with your own
          API key. Your key is sent directly with the request and never stored.
          Generated images are hosted for up to 30 days — download them for
          safekeeping. Anyone with the result link can view the image.
        </p>

        <div className="mt-6 border-t border-white/10 pt-6">
          <h2 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">
            API Credentials
          </h2>
          <CredentialsForm />
        </div>

        <div className="mt-6 border-t border-white/10 pt-6">
          <h2 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">
            Image Prompt
          </h2>
          <PromptForm />
        </div>
      </div>
    </main>
  );
}
