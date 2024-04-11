import { CredentialsForm } from "@/components/Credentials";
import { PromptForm } from "@/components/Prompt";
import { merge } from "@keegancodes/foundations";
import { GeistSans } from "geist/font/sans";

export const maxDuration = 300;

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 sm:p-12 md:p-24 w-full">
      <div
        className={merge(
          "z-10 w-full items-center bg-[rgba(0,0,0,0.2)] backdrop-blur-md text-white p-4 rounded-lg",
          GeistSans.className
        )}
      >
        <div>
          <h1 className="font-bold text-2xl">DALL·E 3 UI</h1>
          <p className="pt-4">
            Input your OpenAI API key and prompt to generate an image using the
            DALL·E 3 model.
          </p>
          <p className="pt-6 text-sm">
            Your API token is sent with your request to generate the image, but
            is never stored on our servers. The resulting image is stored on our
            server for easy retrieval. Bookmark the result page if you want to
            come back to it later. Images may be deleted after a period of 30
            days, so downloading it is recommended. Do not direct link to the
            image from the internet.
          </p>
          <p className="pt-6 text-sm">
            A unique URL will be generated for your image. Anyone with the link
            can access and download the image.
          </p>
          <div className="pt-6">
            <CredentialsForm />
          </div>
          <div className="pt-6">
            <PromptForm />
          </div>
        </div>
      </div>
    </main>
  );
}
