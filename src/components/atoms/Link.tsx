import React from "react";
import { cn } from "@/lib/utils";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "default" | "netflix" | "muted" | "underline";
  external?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { variant = "default", external = false, className, children, ...props },
    ref
  ) => {
    const variants = {
      default: "text-foreground hover:text-primary transition-colors",
      netflix:
        "text-primary hover:text-netflix-hover transition-colors font-medium",
      muted: "text-muted-foreground hover:text-foreground transition-colors",
      underline:
        "text-foreground hover:text-primary underline underline-offset-4 transition-colors",
    };

    const externalProps = external
      ? {
          target: "_blank",
          rel: "noopener noreferrer",
        }
      : {};

    return (
      <a
        ref={ref}
        className={cn(
          "inline-block cursor-pointer",
          variants[variant],
          className
        )}
        {...externalProps}
        {...props}
      >
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";

export default Link;
