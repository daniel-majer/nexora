import React from "react";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
}

export const Heading = ({
  className = "",
  level,
  children,
  ...rest
}: HeadingProps) => {
  switch (level) {
    case "h1":
      return (
        <h1
          className={`text-2xl font-bold sm:text-3xl lg:text-4xl ${className}`}
          {...rest}
        >
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 className={`text-2xl font-bold ${className}`} {...rest}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={`text-base font-bold sm:text-lg lg:text-xl ${className}`}
          {...rest}
        >
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4 className={`text-lg font-bold ${className}`} {...rest}>
          {children}
        </h4>
      );
    case "h5":
      return (
        <h5 className={`text-base font-bold ${className}`} {...rest}>
          {children}
        </h5>
      );
    case "h6":
      return (
        <h6 className={`text-sm font-bold ${className}`} {...rest}>
          {children}
        </h6>
      );
    default:
      return (
        <h1 className={`text-3xl font-bold ${className}`} {...rest}>
          {children}
        </h1>
      );
  }
};
