import React from "react";
import { cn } from "@/lib/utils";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  variant?: "default" | "rounded" | "circle" | "netflix-poster";
  loading?: "lazy" | "eager";
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    { variant = "default", loading = "lazy", className, alt, ...props },
    ref
  ) => {
    const variants = {
      default: "",
      rounded: "rounded-lg",
      circle: "rounded-full",
      "netflix-poster": "rounded-md aspect-[2/3] object-cover",
    };

    return (
      <img
        ref={ref}
        className={cn("block", variants[variant], className)}
        loading={loading}
        alt={alt}
        {...props}
      />
    );
  }
);

Image.displayName = "Image";

export default Image;
