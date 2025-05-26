import React from "react";

export const OrderSummary = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  const customId = `#${id?.split("-")?.[0]}`;

  return (
    <div className="mb-8 space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-xl transition duration-500 dark:border-gray-700 dark:bg-zinc-900">
      <div>
        <p className="text-gray-500 dark:text-gray-400">Order ID</p>
        <p className="text-xl font-semibold tracking-wide">
          {customId.toUpperCase()}
        </p>
      </div>
      {children}
    </div>
  );
};
