import { useSearchParams } from "react-router";

export const useSortBy = <T,>({
  field,
  originData,
  filterData,
}: {
  field: string;
  originData: T[];
  filterData: T[];
}) => {
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || field;
  const [filteredKey, value] = sortBy.split("-");

  const sort = () => {
    if (!originData || !filteredKey) return originData;

    return [...filterData].sort((a, b) => {
      const aValue = a[filteredKey as keyof T];
      const bValue = b[filteredKey as keyof T];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return value === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      if (typeof aValue === "number" && typeof bValue === "number") {
        return value === "asc" ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });
  };

  const sortedData = sort();

  return { sortedData };
};
