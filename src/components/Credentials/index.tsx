import { redirect } from "next/navigation";
import { ClientCredentialsForm } from "./Client";
import { cookies } from "next/headers";

export const apiKeyName = "openai-api-key";

const action = async (data: FormData) => {
  "use server";

  const apiKey = data.get(apiKeyName) as string;

  cookies().set(apiKeyName, apiKey);

  return redirect("/");
};

export const CredentialsForm = () => {
  const apiKeyValue = cookies().get(apiKeyName)?.value ?? "";

  return (
    <form action={action} className="flex flex-col">
      <span className="flex flex-col gap-2">
        <label htmlFor={apiKeyName} className="text-xs text-white/50">
          API Key
        </label>
        <div className="flex gap-2">
          <input
            defaultValue={apiKeyValue}
            placeholder="sk-proj-..."
            name={apiKeyName}
            type="password"
            className="bg-black/20 border border-white/15 focus:border-white/45 focus:outline-none rounded-lg shadow-sm text-white p-2 w-full transition-colors placeholder:text-white/25"
          />
          <ClientCredentialsForm className="whitespace-nowrap bg-black/40 hover:bg-black/60 border border-white/20 text-white text-sm px-4 py-2 rounded-lg transition-colors disabled:opacity-40">
            Save
          </ClientCredentialsForm>
        </div>
      </span>
    </form>
  );
};
