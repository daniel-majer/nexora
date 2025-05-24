import React from "react";

export const OrderSummary = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mb-8 space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-zinc-900">
      {children}
    </div>
  );
};
