import { Heading } from "./Heading";
import { Button, classNamesMap } from "./Button";
import { SpinnerMini } from "./SpinnerMini";

export const Delete = ({
  handle,
  close,
  isPending,
  message,
  title,
  type = "delete",
}: {
  handle?: () => void;
  close?: () => void;
  isPending: boolean;
  message: string;
  title: string;
  type?: keyof typeof classNamesMap;
}) => {
  const deleteItem = async () => {
    if (!handle) return;

    try {
      await handle();
      close?.();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };
  return (
    <div>
      <Heading level="h2" className="dark:text-white">
        {title}
      </Heading>
      <p className="mb-6 text-sm text-gray-600 sm:text-base dark:text-zinc-300">
        {message}
      </p>
      <div className="flex space-x-4">
        <Button
          onClick={deleteItem}
          variant={type}
          disabled={isPending}
          className={`${isPending ? "min-w-36 cursor-not-allowed opacity-50" : ""}`}
        >
          {isPending ? <SpinnerMini /> : title}
        </Button>
        <Button onClick={close} variant="secondary">
          Cancel
        </Button>
      </div>
    </div>
  );
};
