import React from "react";
import { cn } from "@/lib/utils";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: "default" | "muted" | "secondary" | "netflix";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      as: Component = "p",
      variant = "default",
      size = "base",
      weight = "normal",
      className,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: "text-foreground",
      muted: "text-muted-foreground",
      secondary: "text-netflix-text-secondary",
      netflix: "netflix-text-gradient font-bold",
    };

    const sizes = {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
    };

    const weights = {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    };

    return (
      <Component
        ref={ref as any}
        className={cn(
          variants[variant],
          sizes[size],
          weights[weight],
          className
        )}
        {...props}
      />
    );
  }
);

Text.displayName = "Text";

export default Text;
