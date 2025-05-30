import React from "react";
import clsx from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "success" | "warning" | "danger" | "neutral";
  className?: string;
}

const baseStyles =
  "inline-block rounded-full px-3 py-0.5 text-xs font-medium transition duration-500";

const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  primary: "bg-blue-100 text-blue-800",
  success: "bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-950",
  warning:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-950",
  danger: "bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-950",
  neutral: "bg-gray-200 text-gray-800",
};

export default function Badge({
  children,
  variant = "neutral",
  className = "",
}: BadgeProps) {
  return (
    <span className={clsx(baseStyles, variantStyles[variant], className)}>
      {children}
    </span>
  );
}
