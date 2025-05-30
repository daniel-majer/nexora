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
    <div className="mb-6 space-y-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl transition duration-500 sm:mb-8 sm:space-y-6 sm:p-6 dark:border-gray-700 dark:bg-zinc-900">
      <div>
        <p className="text-gray-500 transition duration-500 dark:text-gray-400">
          Order ID
        </p>
        <p className="text-base font-semibold tracking-wide sm:text-xl">
          {customId.toUpperCase()}
        </p>
      </div>
      {children}
    </div>
  );
};
