import { ClientCredentialsForm } from "./Client";
import { cookies } from "next/headers";

export const apiKeyName = "openai-api-key";

const action = async (data: FormData) => {
  "use server";

  const apiKey = data.get(apiKeyName) as string;

  cookies().set(apiKeyName, apiKey);
};

export const CredentialsForm = () => {
  const apiKeyValue = cookies().get(apiKeyName)?.value ?? "";

  return (
    <form action={action} className="flex flex-col">
      <span className="flex flex-col gap-2">
        <label htmlFor={apiKeyName} className="text-sm opacity-50">
          OpenAI API Key
        </label>
        <div className="flex gap-2">
          <input
            defaultValue={apiKeyValue}
            placeholder="OpenAI API Key"
            name={apiKeyName}
            type="text"
            className="bg-[rgba(0,0,0,0.2)] rounded-lg shadow-md text-white p-2 w-full"
          />
          <ClientCredentialsForm className="whitespace-nowrap bg-[rgba(0,0,0,0.5)] p-2 rounded-lg hover:bg-[rgba(0,0,0,0.7)]">
            Save Credentials
          </ClientCredentialsForm>
        </div>
      </span>
    </form>
  );
};
