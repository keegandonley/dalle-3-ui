"use client";

import { useFormStatus } from "react-dom";

interface ClientPromptFormProps {
  children: any;
}

export const ClientPromptForm = (props: ClientPromptFormProps) => {
  const { children } = props;

  const res = useFormStatus();

  return <button disabled={res.pending}>{children}</button>;
};
