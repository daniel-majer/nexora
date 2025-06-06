import { useFormContext } from "react-hook-form";

type FileUploadProps = {
  name: string;
  label?: string;
  accept?: string;
  validation?: object;
};

export const FileUpload = ({
  name,
  label,
  accept = "image/*",
  validation = {},
}: FileUploadProps) => {
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
          className="font-medium text-gray-700 transition duration-500 dark:text-white"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        type="file"
        accept={accept}
        {...register(name, validation)}
        className="block w-full cursor-pointer text-sm text-gray-900 transition duration-500 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-purple-900 file:px-4 file:py-2 file:text-white hover:file:bg-purple-800 dark:bg-zinc-800 dark:text-white dark:file:bg-purple-700 dark:hover:file:bg-purple-600"
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};
