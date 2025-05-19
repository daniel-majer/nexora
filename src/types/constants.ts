export const Status = {
  Pending: "pending",
  Processing: "processing",
  Shipped: "shipped",
  Delivered: "delivered",
  Cancelled: "cancelled",
} as const;

export const PaymentMethods = {
  CreditCard: 1,
  PayPal: 2,
  BankTransfer: 3,
  CashOnDelivery: 4,
} as const;

export const DeliveryMethods = {
  Standard: 1,
  Express: 2,
  SameDay: 3,
  Pickup: 4,
} as const;

export type StatusType = keyof typeof Status;
export type PaymentMethodsType = keyof typeof PaymentMethods;
export type DeliveryMethodsType = keyof typeof DeliveryMethods;
