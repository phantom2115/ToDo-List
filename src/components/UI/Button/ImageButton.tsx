import { cn } from "../../../lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { ButtonHTMLAttributes } from "react";

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
}

const ImageButton = ({
  variant,
  icon,
  className,
  ...props
}: ImageButtonProps) => {
  return (
    <button
      className={cn(ImageButtonVariants({ variant }), className)}
      {...props}
    >
      <div className="size-6 flex items-center justify-center">{icon}</div>
    </button>
  );
};

export default ImageButton;
