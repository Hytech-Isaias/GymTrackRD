import { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "destructive" | "success";
}

const Badge = ({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) => {
  const variants = {
    default: "border-transparent bg-blue-500 text-white",
    secondary: "border-transparent bg-slate-800 text-slate-300",
    outline: "text-slate-300 border-slate-700",
    destructive: "border-transparent bg-red-900 text-red-100",
    success: "border-transparent bg-green-500/20 text-green-400",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 tracking-wider uppercase",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { Badge };
