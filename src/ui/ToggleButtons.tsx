import { useSearchParams } from "react-router";
type Option = {
  label: string;
  value: string;
};

type ToggleProps = {
  options: Option[];
  field: string;
  value: string;
};
export const ToggleButtons = ({ options, field, value }: ToggleProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const param = searchParams.get(field) || value;
  const page = searchParams.get("page");

  function setParam(option: string) {
    searchParams.set(field, option);
    if (page) searchParams.set("page", "1");
    setSearchParams(searchParams);
  }

  return (
    <div className="inline-flex flex-wrap items-center gap-1 rounded-md lg:gap-2 xl:flex-nowrap">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setParam(option.value)}
          className={`cursor-pointer rounded-sm px-2 py-1 text-xs font-medium whitespace-nowrap text-gray-600 transition duration-500 sm:rounded-md sm:px-4 sm:py-2 sm:text-sm dark:text-gray-300 dark:hover:bg-purple-700 ${param === option.value ? "bg-purple-900 text-white shadow hover:bg-purple-800 dark:bg-purple-700 dark:text-white dark:hover:bg-purple-600" : "bg-zinc-100 text-gray-600 dark:bg-zinc-900 dark:text-white dark:hover:bg-purple-700"}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
