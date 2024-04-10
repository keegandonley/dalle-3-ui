"use client";

import { useFormStatus } from "react-dom";

interface ClientCredentialsFormProps {
  children: any;
}

export const ClientCredentialsForm = (props: ClientCredentialsFormProps) => {
  const { children } = props;

  const res = useFormStatus();

  return <button disabled={res.pending}>{children}</button>;
};
