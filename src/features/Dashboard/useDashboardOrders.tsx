import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getDashboardOrders } from "../../services/apiDashboard";

export const useDashboardOrders = () => {
  const [searchParams] = useSearchParams();
  const payment = searchParams.get("payment");

  const filterByPayment =
    !payment || payment === "all"
      ? null
      : {
          field: "paymentMethod",
          value: payment,
        };

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard", payment],
    queryFn: () => getDashboardOrders({ filterByPayment }),
  });

  return { data, isLoading };
};
