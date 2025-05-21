import React from "react";
import { Heading } from "./Heading";
import { Button } from "./Button";

export const Delete = ({
  handle,
  close,
}: {
  handle?: () => void;
  close?: () => void;
}) => {
  return (
    <div>
      <Heading level="h2">Delete product</Heading>
      <p className="mb-6 text-gray-600">
        Are you sure you want to delete this product? This action cannot be
        undone.
      </p>
      <div className="space-x-4">
        <Button onClick={handle} variant="delete">
          Delete product
        </Button>
        <Button onClick={close} variant="secondary">
          Cancel
        </Button>
      </div>
    </div>
  );
};
