"use client";

import { merge } from "@keegancodes/foundations";
import { useFormStatus } from "react-dom";

interface ClientPromptFormProps {
  children: any;
  className?: string;
  disabled?: boolean;
}

export const ClientPromptForm = (props: ClientPromptFormProps) => {
  const { children, className, disabled } = props;

  const res = useFormStatus();

  return (
    <button
      className={merge(className, "disabled:opacity-40 disabled:cursor-not-allowed")}
      disabled={res.pending || disabled}
    >
      {res.pending ? "Generating…" : children}
    </button>
  );
};

const sizes = ["1024x1024", "1536x1024", "1024x1536", "auto"];
const qualities = ["auto", "low", "medium", "high"];
const models = [
  "gpt-image-1",
  "gpt-image-1-mini",
  "gpt-image-1.5",
  "gpt-image-2",
  "chatgpt-image-latest",
];

interface ImageOptionsFormProps {
  modelName: string;
  resolutionName: string;
  qualityName: string;
  defaultModel: string;
  defaultResolution: string;
  defaultQuality: string;
  selectClass: string;
}

export const ImageOptionsForm = ({
  modelName,
  resolutionName,
  qualityName,
  defaultModel,
  defaultResolution,
  defaultQuality,
  selectClass,
}: ImageOptionsFormProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <span className="flex flex-col">
        <label className="text-xs text-white/50 pb-1.5">Model</label>
        <select name={modelName} defaultValue={defaultModel} className={selectClass}>
          {models.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </span>
      <span className="flex flex-col">
        <label className="text-xs text-white/50 pb-1.5">Resolution</label>
        <select name={resolutionName} defaultValue={defaultResolution} className={selectClass}>
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </span>
      <span className="flex flex-col">
        <label className="text-xs text-white/50 pb-1.5">Quality</label>
        <select name={qualityName} defaultValue={defaultQuality} className={selectClass}>
          {qualities.map((q) => (
            <option key={q} value={q}>
              {q.charAt(0).toUpperCase() + q.slice(1)}
            </option>
          ))}
        </select>
      </span>
    </div>
  );
};
