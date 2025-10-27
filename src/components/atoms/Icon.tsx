import React from "react";
import { cn } from "@/lib/utils";

interface IconProps extends React.SVGAttributes<SVGElement> {
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  variant?: "default" | "netflix" | "muted";
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    { size = "base", variant = "default", className, children, ...props },
    ref
  ) => {
    const sizes = {
      xs: "w-3 h-3",
      sm: "w-4 h-4",
      base: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-8 h-8",
    };

    const variants = {
      default: "text-foreground",
      netflix: "text-primary",
      muted: "text-muted-foreground",
    };

    return (
      <svg
        ref={ref}
        className={cn(
          "inline-block",
          sizes[size],
          variants[variant],
          className
        )}
        fill="currentColor"
        viewBox="0 0 24 24"
        {...props}
      >
        {children}
      </svg>
    );
  }
);

Icon.displayName = "Icon";

export default Icon;
