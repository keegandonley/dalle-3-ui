import { redirect } from "next/navigation";
import { apiKeyName } from "../Credentials";
import { ClientPromptForm } from "./Client";
import { cookies } from "next/headers";
import OpenAI from "openai";
import { randomUUID } from "crypto";
import { S3 } from "aws-sdk";

const promptName = "openai-prompt";

export const maxDuration = 300;

const action = async (data: FormData) => {
  "use server";

  const prompt = data.get(promptName) as string;

  cookies().set(promptName, prompt);

  const apiKey = cookies().get(apiKeyName)?.value;

  const openai = new OpenAI({
    apiKey,
  });

  if (!apiKey) {
    return;
  }

  let imageUrl = "";

  try {
    console.log("running...");
    const res = await openai.images.generate({
      prompt,
      model: "dall-e-3",
      n: 1,
      quality: "standard",
      response_format: "url",
      size: "1792x1024",
      style: "vivid",
    });

    const url = res?.data?.[0]?.url;

    if (url) {
      console.log(url);
      const sourceImage = await fetch(url);
      const sourceImageBuffer = await sourceImage.arrayBuffer();
      const params = {
        Bucket: process.env.R2_PHOTO_BUCKET!,
        Key: `${randomUUID()}.png`,
        Body: Buffer.from(sourceImageBuffer),
        ContentType: "image/png",
        ACL: "public-read",
      };

      const r2 = new S3({
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
        endpoint: process.env.R2_ENDPOINT,
        s3ForcePathStyle: true, // Required for R2 compatibility
        signatureVersion: "v4",
        sslEnabled: true,
        region: "auto",
      });

      const result: any = await new Promise((resolve, reject) => {
        r2.upload(params, (err: Error, data: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });

      console.log(result);

      imageUrl = result?.Key;
    }
  } catch (error) {
    return;
  }

  return redirect(`/done?imageUrl=https://dalle.static.donley.xyz/${imageUrl}`);
};

export const PromptForm = () => {
  const promptValue = cookies().get(promptName)?.value ?? "";

  return (
    <form action={action} className="flex flex-col gap-4">
      <span className="flex flex-col gap-2">
        <label htmlFor={promptName} className="text-sm opacity-50">
          Prompt
        </label>
        <textarea
          defaultValue={promptValue}
          placeholder="Prompt"
          name={promptName}
          className="bg-[rgba(0,0,0,0.2)] rounded-lg shadow-md text-white p-2 w-full h-64"
        />
      </span>
      <ClientPromptForm className="whitespace-nowrap bg-[rgba(0,0,0,0.5)] p-2 rounded-lg hover:bg-[rgba(0,0,0,0.7)]">
        Generate
      </ClientPromptForm>
    </form>
  );
};
