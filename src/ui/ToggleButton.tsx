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

  function setParam(option: string) {
    searchParams.set(field, option);
    setSearchParams(searchParams);
  }

  return (
    <div className="inline-flex items-center rounded-md bg-gray-100 p-1 dark:bg-gray-800">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setParam(option.value)}
          className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition dark:text-gray-300 dark:hover:bg-gray-700 ${param === option.value ? "bg-purple-900 text-white shadow hover:bg-purple-800" : "text-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
