import { Heading } from "../../ui/Heading";
import { ToggleButtons } from "../../ui/ToggleButtons";

export const HeaderDash = () => {
  return (
    <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end xl:gap-8">
      <div className="mb-2  transition duration-500 ">
        <Heading level="h1">Dashboard</Heading>
        <Heading
          level="h3"
          className="mt-1 font-extralight text-zinc-500 transition duration-500 xl:mt-2 dark:text-zinc-300"
        >
          Get a quick overview of your products, orders, and sales in this
          dashboard.
        </Heading>
      </div>
      <div>
        <ToggleButtons
          options={[
            { value: "all", label: "All orders" },
            { value: "1", label: "Credit card" },
            { value: "2", label: "PayPal" },
            { value: "3", label: "Bank transfer" },
            { value: "4", label: "Cash" },
          ]}
          field="payment"
          value="all"
        />
      </div>
    </div>
  );
};
