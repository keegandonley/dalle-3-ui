import { redirect } from "next/navigation";
import { apiKeyName } from "../Credentials";
import { ClientPromptForm, ImageOptionsForm } from "./Client";
import { cookies } from "next/headers";
import OpenAI from "openai";
import { randomUUID } from "crypto";
import { S3 } from "aws-sdk";
import Link from "next/link";

const promptName = "openai-prompt";
const resolutionName = "openai-resolution";
const modelName = "openai-model";
const qualityName = "openai-quality";

export const maxDuration = 300;

const action = async (data: FormData) => {
  "use server";

  const prompt = data.get(promptName) as string;
  const model = (data.get(modelName) as string) ?? "gpt-image-1";
  const resolution = (data.get(resolutionName) as string) ?? "1024x1024";
  const quality = (data.get(qualityName) as string) ?? "auto";

  cookies().set(promptName, prompt);
  cookies().set(modelName, model);
  cookies().set(resolutionName, resolution);
  cookies().set(qualityName, quality);

  const apiKey = cookies().get(apiKeyName)?.value;

  if (!apiKey) {
    return redirect(
      `/error?message=${encodeURIComponent("No API key provided")}`
    );
  }

  const openai = new OpenAI({ apiKey });

  let imageUrl = "";

  try {
    const res = await openai.images.generate({
      prompt,
      model,
      n: 1,
      size: resolution as any,
      quality: quality as any,
    });

    const b64 = res?.data?.[0]?.b64_json;
    if (!b64) throw new Error("No image data returned");

    const imageBuffer = Buffer.from(b64, "base64");

    const r2 = new S3({
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      endpoint: process.env.R2_ENDPOINT,
      s3ForcePathStyle: true,
      signatureVersion: "v4",
      sslEnabled: true,
      region: "auto",
    });

    const key = `${randomUUID()}.png`;
    const result: any = await new Promise((resolve, reject) => {
      r2.upload(
        {
          Bucket: process.env.R2_PHOTO_BUCKET!,
          Key: key,
          Body: imageBuffer,
          ContentType: "image/png",
          ACL: "public-read",
        },
        (err: Error, data: any) => {
          if (err) reject(err);
          else resolve(data);
        }
      );
    });

    imageUrl = result?.Key;
  } catch (error: any) {
    return redirect(`/error?message=${encodeURIComponent(error.message)}`);
  }

  return redirect(
    `/done?imageUrl=https://dalle.static.donley.xyz/${imageUrl}&resolution=${resolution}&quality=${quality}&model=${encodeURIComponent(model)}`
  );
};

export const PromptForm = () => {
  const promptValue = cookies().get(promptName)?.value ?? "";
  const modelValue = cookies().get(modelName)?.value ?? "gpt-image-1";
  const resolutionValue = cookies().get(resolutionName)?.value ?? "1024x1024";
  const qualityValue = cookies().get(qualityName)?.value ?? "auto";
  const apiKey = cookies().get(apiKeyName)?.value;

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
      <ImageOptionsForm
        modelName={modelName}
        resolutionName={resolutionName}
        qualityName={qualityName}
        defaultModel={modelValue}
        defaultResolution={resolutionValue}
        defaultQuality={qualityValue}
        selectClass="bg-[rgba(0,0,0,0.2)] rounded-lg shadow-md text-white p-2"
      />
      <ClientPromptForm
        disabled={!apiKey}
        className="whitespace-nowrap bg-[rgba(0,0,0,0.5)] p-2 rounded-lg hover:bg-[rgba(0,0,0,0.7)]"
      >
        Generate
      </ClientPromptForm>
      <Link
        className="text-center text-sm opacity-70"
        href="https://platform.openai.com/docs/api-reference/images/create"
        target="_blank"
      >
        read the docs
      </Link>
    </form>
  );
};
