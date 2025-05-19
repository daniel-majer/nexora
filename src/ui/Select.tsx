import type { ComponentProps } from "react";
import { useFormContext } from "react-hook-form";

type SelectProps = {
  name: string;
  label?: string;
  options: { value: string | number; label: string }[];
  className?: string;
  validation?: object;
} & ComponentProps<"select">;

export const Select = ({
  name,
  label,
  options,
  className = "",
  validation = {},
  ...rest
}: SelectProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string;

  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700 dark:text-white"
        >
          {label}
        </label>
      )}
      <select
        id={name}
        {...register(name, validation)}
        {...rest}
        className={`rounded-md border px-3 py-2 text-sm transition outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white ${className} ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">-- Choose category --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};
