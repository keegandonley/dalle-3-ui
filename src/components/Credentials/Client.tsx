"use client";

import { useFormStatus } from "react-dom";

interface ClientCredentialsFormProps {
  children: any;
  className?: string;
}

export const ClientCredentialsForm = (props: ClientCredentialsFormProps) => {
  const { children, className } = props;

  const res = useFormStatus();

  return (
    <button className={className} disabled={res.pending}>
      {children}
    </button>
  );
};
