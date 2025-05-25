import React from "react";
import { Heading } from "../../ui/Heading";
import { Button } from "../../ui/Button";
import { ArrowLeftIcon } from "lucide-react";
import { PaymentBanner } from "../../ui/PaymentBanner";
import { useNavigate } from "react-router";

export const OrderHeading = ({ paymentStatus }: { paymentStatus: string }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <Heading level="h1" className="text-4xl font-extrabold tracking-tight">
          🧾 Order Details
        </Heading>

        <Button size="md" onClick={() => navigate(-1)}>
          <span className="flex gap-2">
            <ArrowLeftIcon />
            Back
          </span>
        </Button>
      </div>
      <PaymentBanner
        status={
          paymentStatus === "paid"
            ? "paid"
            : paymentStatus === "pending"
              ? "pending"
              : "failed"
        }
      />
    </>
  );
};
