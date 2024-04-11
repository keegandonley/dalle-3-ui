"use client";

import { useFormStatus } from "react-dom";

interface ClientPromptFormProps {
  children: any;
  className?: string;
}

export const ClientPromptForm = (props: ClientPromptFormProps) => {
  const { children, className } = props;

  const res = useFormStatus();

  return (
    <button className={className} disabled={res.pending}>
      {children}
    </button>
  );
};
