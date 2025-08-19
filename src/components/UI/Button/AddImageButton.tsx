"use client";
import { cn } from "../../../lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { ButtonHTMLAttributes, useRef } from "react";

const ImageButtonVariants = cva(
  "flex items-center justify-center size-16 rounded-full cursor-pointer",
  {
    variants: {
      variant: {
        attach: "bg-slate-200",
        edit: "bg-slate-900/50 inset-ring-slate-900 inset-ring-2",
      },
    },
  }
);
interface ImageButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ImageButtonVariants> {
  icon: React.ReactNode;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddImageButton = ({
  variant,
  icon,
  className,
  handleFileChange,
  ...props
}: ImageButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        type="file"
        accept="image/*"
        hidden
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button
        className={cn(ImageButtonVariants({ variant }), className)}
        onClick={() => {
          fileInputRef.current?.click();
        }}
        {...props}
      >
        <div className="size-6 flex items-center justify-center">{icon}</div>
      </button>
    </>
  );
};

export default AddImageButton;
