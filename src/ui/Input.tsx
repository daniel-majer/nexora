import { type ComponentProps } from "react";

import { useFormContext } from "react-hook-form";

type InputProps = {
  name: string;
  label?: string;
  className?: string;
  validation?: object;
} & ComponentProps<"input">;

export const Input = ({
  name,
  label,
  className = "",
  validation = {},
  ...rest
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label
          htmlFor={name}
          className="font-medium text-gray-700 dark:text-white"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        {...register(name, validation)}
        {...rest}
        className={`rounded-md border px-3 py-2 text-sm transition outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 dark:bg-zinc-800 dark:text-white ${className} ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};
