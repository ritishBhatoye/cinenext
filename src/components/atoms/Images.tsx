import React from "react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";

interface ImageProps {
  src: string;
  alt: string;
  variant?: "default" | "rounded" | "circle" | "netflix-poster";
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      variant = "default",
      className,
      alt,
      src,
      width,
      height,
      fill = false,
      priority = false,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: "",
      rounded: "rounded-lg",
      circle: "rounded-full",
      "netflix-poster": "rounded-md aspect-[2/3] object-cover",
    };

    const imageProps = {
      src,
      alt,
      fill,
      priority,
      className: cn("block", variants[variant], className),
      ...(width && { width }),
      ...(height && { height }),
      ...props,
    };

    return <NextImage ref={ref} {...imageProps} />;
  }
);

Image.displayName = "Image";

export default Image;
