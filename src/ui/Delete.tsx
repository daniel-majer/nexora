import React from "react";
import { Heading } from "./Heading";
import { Button } from "./Button";
import { SpinnerMini } from "./SpinnerMini";

export const Delete = ({
  handle,
  close,
  isPending,
}: {
  handle?: () => void;
  close?: () => void;
  isPending: boolean;
}) => {
  const deleteItem = async () => {
    if (!handle) return;

    try {
      await handle(); // Now properly awaits a Promise
      close?.(); // Only close on success
    } catch (error) {
      console.error("Delete failed:", error);
      // Error handling - don't close the modal
    }
  };
  return (
    <div>
      <Heading level="h2">Delete product</Heading>
      <p className="mb-6 text-gray-600">
        Are you sure you want to delete this product? This action cannot be
        undone.
      </p>
      <div className="flex space-x-4">
        <Button
          onClick={deleteItem}
          variant="delete"
          disabled={isPending}
          className={`${isPending ? "min-w-36 cursor-not-allowed opacity-50" : ""}`}
        >
          {/* <SpinnerMini /> */}
          {isPending ? <SpinnerMini /> : "Delete product"}
        </Button>
        <Button onClick={close} variant="secondary">
          Cancel
        </Button>
      </div>
    </div>
  );
};
