import { useSearchParams } from "react-router";
import { Button } from "./Button";
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
    <div className="inline-flex shrink-0 flex-wrap items-center gap-1 rounded-md lg:gap-2 xl:flex-nowrap">
      {options.map((option) => (
        <Button
          size="md"
          key={option.value}
          onClick={() => setParam(option.value)}
          className={` ${param === option.value ? "bg-purple-900 text-white shadow hover:bg-purple-800 dark:bg-purple-700 dark:text-white dark:hover:bg-purple-600" : "bg-zinc-100 text-zinc-900 hover:text-white dark:bg-zinc-900 dark:text-white dark:hover:bg-purple-700"}`}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};
