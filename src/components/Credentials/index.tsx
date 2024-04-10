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
      <span className="flex flex-col">
        <label htmlFor={apiKeyName}>OpenAI API Key</label>
        <input
          defaultValue={apiKeyValue}
          placeholder="OpenAI API Key"
          name={apiKeyName}
          type="text"
        />
      </span>
      <ClientCredentialsForm>Save Credentials</ClientCredentialsForm>
    </form>
  );
};
