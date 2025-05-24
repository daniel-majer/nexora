import React from "react";

const paymentBanner = {
  pending: {
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-300",
    message:
      "⚠️ Payment for this order is still pending. Please verify the payment status or follow up with the customer.",
  },
  paid: {
    color:
      "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300",
    message:
      "✅ Payment has been successfully received. You can proceed with processing the order.",
  },
  failed: {
    color: "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-300",
    message:
      "⛔️ Payment failed or was canceled. Please review the payment details or contact the customer.",
  },
};

export const PaymentBanner = ({
  status,
}: {
  status: keyof typeof paymentBanner;
}) => {
  const { color, message } = paymentBanner[status];
  return (
    <div className={`mb-6 rounded-lg p-4 font-medium ${color}`}>{message}</div>
  );
};
