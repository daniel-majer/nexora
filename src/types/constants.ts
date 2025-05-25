export const SUPABASE_URL =
  "https://rhualnaakqnfdhqhjege.supabase.co/storage/v1/object/public";

export const PAGE_SIZE = 10;
export const TAX_RATE = 0.2;
export const SHIPPING = 9.99;

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
