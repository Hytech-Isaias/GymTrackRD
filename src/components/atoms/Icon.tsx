import { useMemo, SVGProps } from "react";
import * as LucideIcons from "lucide-react";

// Type helper for Lucide icon names
export type IconName = keyof typeof LucideIcons;

const sizeMap = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
  "2xl": "w-10 h-10",
};

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: string;
  size?: keyof typeof sizeMap;
  loading?: boolean;
}

export const Icon = ({
  name,
  className = "",
  size = "md",
  loading = false,
  ...props
}: IconProps) => {
  const IconComponent = useMemo(() => {
    // Cast to unknown then to specific type to suppress index signature warning if needed
    // But direct access works if we type 'name' as string and handle check
    return (LucideIcons as any)[name];
  }, [name]);

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return (
      <LucideIcons.AlertCircle
        className={`${sizeMap[size]} ${className}`}
        {...props}
      />
    );
  }

  const classes = `${sizeMap[size]} ${
    loading ? "animate-spin" : ""
  } ${className}`.trim();

  // @ts-ignore - Lucide icons accept extra props that might not strictly match SVGProps in all versions
  return <IconComponent className={classes} {...props} />;
};

export default Icon;
