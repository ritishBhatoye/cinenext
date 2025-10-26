"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface LogoProps {
  variant?: "default" | "light" | "dark";
  animated?: boolean;
  showBackground?: boolean;
  backgroundColor?: string;
}

const Logo = ({
  variant = "default",
  animated = true,
  showBackground = false,
  backgroundColor = "bg-black/50",
}: LogoProps) => {
  const getColors = () => {
    switch (variant) {
      case "light":
        return {
          cine: "text-red-500",
          next: "text-gray-900",
          cineHover: "group-hover:text-red-400",
          nextHover: "group-hover:text-gray-700",
          dot: "bg-red-500",
        };
      case "dark":
        return {
          cine: "text-red-700",
          next: "text-gray-100",
          cineHover: "group-hover:text-red-600",
          nextHover: "group-hover:text-white",
          dot: "bg-red-700",
        };
      default:
        return {
          cine: "text-red-600",
          next: "text-white",
          cineHover: "group-hover:text-red-500",
          nextHover: "group-hover:text-gray-200",
          dot: "bg-red-600",
        };
    }
  };

  const colors = getColors();

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
        staggerChildren: 0.08,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 300,
      },
    },
  };

  return (
    <Link href="/home" className="group cursor-pointer">
      <motion.div
        className={`flex items-center ${
          showBackground
            ? `${backgroundColor} px-4 py-2 rounded-lg backdrop-blur-sm`
            : ""
        }`}
        {...(animated && {
          variants: containerVariants,
          initial: "hidden",
          animate: "visible",
          whileHover: "hover",
        })}
      >
        <span className="text-4xl font-bebas-neue tracking-wider uppercase flex">
          {["C", "i", "n", "e"].map((letter, index) =>
            animated ? (
              <motion.span
                key={`cine-${index}`}
                className={`${colors.cine} ${colors.cineHover} transition-colors duration-300 inline-block`}
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  y: [0, -8, 0],
                }}
                transition={{
                  opacity: { duration: 0.5, delay: index * 0.08 },
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut" as const,
                    delay: index * 0.15,
                  },
                }}
                whileHover={{
                  scale: 1.2,
                  color: "#ef4444",
                  transition: { duration: 0.2 },
                }}
              >
                {letter}
              </motion.span>
            ) : (
              <span
                key={`cine-${index}`}
                className={`${colors.cine} ${colors.cineHover} transition-colors duration-300 inline-block`}
              >
                {letter}
              </span>
            )
          )}
          {["n", "e", "x", "t"].map((letter, index) =>
            animated ? (
              <motion.span
                key={`next-${index}`}
                className={`${colors.next} ${colors.nextHover} transition-colors duration-300 inline-block`}
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  y: [0, -8, 0],
                }}
                transition={{
                  opacity: { duration: 0.5, delay: (index + 4) * 0.08 },
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut" as const,
                    delay: (index + 4) * 0.15,
                  },
                }}
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.2 },
                }}
              >
                {letter}
              </motion.span>
            ) : (
              <span
                key={`next-${index}`}
                className={`${colors.next} ${colors.nextHover} transition-colors duration-300 inline-block`}
              >
                {letter}
              </span>
            )
          )}
        </span>
        {animated ? (
          <motion.div
            className={`ml-1.5 w-2.5 h-2.5 ${colors.dot} rounded-full shadow-lg`}
            variants={letterVariants}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.6, 1],
              boxShadow: [
                "0 0 0px rgba(239, 68, 68, 0.5)",
                "0 0 15px rgba(239, 68, 68, 0.8)",
                "0 0 0px rgba(239, 68, 68, 0.5)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut" as const,
            }}
            whileHover={{
              scale: 1.8,
              rotate: 360,
              transition: { duration: 0.4 },
            }}
          />
        ) : (
          <div
            className={`ml-1.5 w-2.5 h-2.5 ${colors.dot} rounded-full transition-transform duration-200 group-hover:scale-110`}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default Logo;
