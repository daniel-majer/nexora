import React, { type ButtonHTMLAttributes } from "react";

export const classNamesMap = {
  primary:
    "bg-purple-900 text-white hover:bg-purple-800 dark:bg-purple-700 dark:hover:bg-purple-600",
  secondary: "bg-gray-200 text-black",
  success: "bg-green-500 text-white",
  delete: "bg-red-500 text-white",
};

const sizeClassMap = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2 ",
  lg: "text-lg px-5 py-3",
};

type ButtonProps = {
  variant?: keyof typeof classNamesMap;
  size?: keyof typeof sizeClassMap;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};

export const Button = ({
  variant = "primary",
  size = "md",
  onClick,
  children,
  className,
  ...rest
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer rounded-md font-semibold whitespace-nowrap transition duration-500 hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 ${classNamesMap[variant]} ${className} ${sizeClassMap[size]}`}
      {...rest}
    >
      {children}
    </button>
  );
};
