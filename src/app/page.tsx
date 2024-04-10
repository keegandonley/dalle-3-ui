import { CredentialsForm } from "@/components/Credentials";
import { PromptForm } from "@/components/Prompt";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div>
          The missing DALL·E 3 UI
          <CredentialsForm />
          <PromptForm />
        </div>
      </div>
    </main>
  );
}
