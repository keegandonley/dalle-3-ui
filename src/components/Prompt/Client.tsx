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
      className={merge(className, "disabled:opacity-40")}
      disabled={res.pending || disabled}
    >
      {res.pending ? "loading..." : children}
    </button>
  );
};
