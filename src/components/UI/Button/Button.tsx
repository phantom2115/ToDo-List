import { cn } from "../../../lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import { Typography } from "../Typography";

const buttonVariants = cva(
  cn(
    "flex items-center justify-center shrink-0 cursor-pointer",
    "w-14 h-14 rounded-full",
    "inset-ring-slate-900 inset-ring-2 border-slate-900 border-b-2 border-r-2",
    "md:w-[162px] md:h-14 md:rounded-4xl",
    "lg:w-42 lg:h-14 lg:rounded-4xl"
  ),
  {
    variants: {
      color: {
        default: "bg-slate-200",
        rose: "bg-rose-500",
        violet: "bg-violet-600",
        lime: "bg-lime-300",
      },
    },
  }
);

const textColorVariants = cva("md:flex items-center justify-center hidden", {
  variants: {
    textColor: {
      default: "text-slate-900",
      white: "text-white",
    },
  },
});

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants>,
    VariantProps<typeof textColorVariants> {
  className?: string;
  icon?: React.ReactNode;
  textColor?: "default" | "white";
  textClassName?: string;
  children: React.ReactNode;
}

// 버튼
const Button = ({
  color,
  className,
  icon,
  textColor,
  textClassName,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ color }), className)} {...props}>
      <div className="flex items-center justify-center gap-2">
        <span className="flex items-center justify-center">{icon}</span>
        <Typography
          variant="body1"
          className={cn(textColorVariants({ textColor }), textClassName)}
        >
          {children}
        </Typography>
      </div>
    </button>
  );
};

export default Button;
