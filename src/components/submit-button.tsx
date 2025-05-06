// src/components/submit-button.tsx
"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps extends ButtonProps {
  loadingText?: string;
  pending: boolean; // Accept pending state as a prop
}

export function SubmitButton({
  children,
  loadingText = "Predicting...",
  pending, // Destructure pending prop
  ...props
}: SubmitButtonProps) {

  return (
    <Button {...props} type="submit" disabled={pending || props.disabled}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
