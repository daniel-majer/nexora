import React from "react";
import { Button } from "./Button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { PAGE_SIZE } from "../types/constants";
import { useSearchParams } from "react-router";

export const Pagination = ({ count }: { count?: number | null }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  if (!count) return;

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", String(next));
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", String(prev));
    setSearchParams(searchParams);
  }

  return (
    <div className="mt-6 flex items-center justify-between">
      <div>
        Showing{" "}
        <span className="font-bold">{(currentPage - 1) * PAGE_SIZE + 1}</span>{" "}
        to{" "}
        <span className="font-bold">
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span className="font-bold">{count}</span> results
      </div>
      <div className="flex gap-2">
        <Button
          onClick={prevPage}
          disabled={currentPage === 1}
          variant="secondary"
          size="sm"
          className="flex items-center gap-2 hover:bg-purple-900 hover:text-white"
        >
          <ChevronLeftIcon />
          <span className="">Prev</span>
        </Button>
        <Button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          variant="secondary"
          size="sm"
          className="flex items-center gap-2 hover:bg-purple-900 hover:text-white"
        >
          <span>Next</span>
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
};
