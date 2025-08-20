import { ElementType } from "react";
import { cn } from "@/lib/utils";

export interface TypographyProps {
  variant?: "h1" | "h2" | "h3" | "body1" | "body2";
  children?: React.ReactNode;
  className?: string;
  as?: ElementType;
}

const variantStyles = {
  h1: "text-[20px] font-bold",
  h2: "text-[18px] font-bold",
  h3: "text-[16px] font-extrabold",
  body1: "text-[16px] font-bold",
  body2: "text-[16px] font-normal",
};

const defaultElements = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  body1: "p",
  body2: "p",
};

export const Typography: React.FC<TypographyProps> = ({
  variant = "body1",
  children,
  className,
  as,
}) => {
  const Component = as || defaultElements[variant];
  const baseStyles = "font-nanum-square";
  const variantStyle = variantStyles[variant];

  return (
    <Component className={cn(baseStyles, variantStyle, className)}>
      {children}
    </Component>
  );
};
