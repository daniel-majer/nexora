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
      <div className="mb-6 flex items-center justify-between sm:mb-8">
        <Heading
          level="h1"
          className="font-extrabold tracking-tight transition duration-500"
        >
          <span className="hidden sm:inline">🧾</span>{" "}
          Order Details
        </Heading>

        <Button size="md" onClick={() => navigate(-1)}>
          <span className="flex items-center gap-2">
            <ArrowLeftIcon className="size-4 sm:size-6" />
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
