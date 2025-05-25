import { useSearchParams } from "react-router";

type Option = {
  label: string;
  value: string | number;
};

type SortSelectProps = {
  options: Option[];
  label?: string;
  field: string;
  value: string;
};

export const SortSelect = ({
  options,
  label,
  field,
  value,
}: SortSelectProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get(field) || value;
  const page = searchParams.get("page");

  function setSortBy(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set(field, e.target.value);
    if (page) searchParams.set("page", "1");
    setSearchParams(searchParams);
  }

  return (
    <div className="flex flex-col gap-1 text-sm">
      {label && (
        <label className="text-gray-600 dark:text-gray-300">{label}</label>
      )}
      <select
        value={sortBy}
        onChange={setSortBy}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm transition duration-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none dark:border-gray-700 dark:bg-zinc-900 dark:text-white"
      >
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="text-black dark:text-white"
          >
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
