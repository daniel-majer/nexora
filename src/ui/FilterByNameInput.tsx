import React from "react";
import { SearchIcon } from "lucide-react";
import { useSearchParams } from "react-router";

export const FilterByNameInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = searchParams.get("name") || "";
  const page = searchParams.get("page");

  function setParam(value: string) {
    searchParams.set("name", value);
    if (page) searchParams.set("page", "1");

    setSearchParams(searchParams);
  }

  return (
    <div className="relative w-full max-w-[768px] grow self-start">
      <SearchIcon
        className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 transition duration-500"
        size={20}
      />
      <input
        type="text"
        placeholder="Search by name..."
        value={getParam}
        onChange={(e) => setParam(e.target.value)}
        className="w-full grow rounded-lg border border-gray-300 py-1 pr-4 pl-10 text-sm transition duration-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none sm:py-2 dark:border-gray-700 dark:bg-white dark:text-zinc-900 placeholder:dark:text-zinc-900"
      />
    </div>
  );
};
