import React from "react";
import { SearchIcon } from "lucide-react"; // alebo ak používaš Heroicons, môžeš nahradiť
import { useSearchParams } from "react-router";

export const FilterByNameInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = searchParams.get("name") || "";

  function setParam(value: string) {
    searchParams.set("name", value);
    setSearchParams(searchParams);
  }

  return (
    <div className="relative grow">
      <SearchIcon
        className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 transition duration-500"
        size={20}
      />
      <input
        type="text"
        placeholder="Search by name..."
        value={getParam}
        onChange={(e) => setParam(e.target.value)}
        className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 text-sm transition duration-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none dark:border-gray-700 dark:bg-purple-100 dark:text-zinc-900 placeholder:dark:text-zinc-900"
      />
    </div>
  );
};
