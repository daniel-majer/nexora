import clsx from "clsx";
import React from "react";
import type { ChildrenProp } from "../types/types";
import { Spinner } from "./Spinner";

interface TableProps {
  columns: string;
  isLoading: boolean;
}

type TableComponentProps = TableProps & ChildrenProp;

const TableContext = React.createContext<TableProps | undefined>(undefined);

const Table = ({ columns, isLoading, children }: TableComponentProps) => {
  return (
    <TableContext.Provider value={{ columns, isLoading }}>
      <div
        className={clsx(
          isLoading && "flex min-h-3/4 items-center",
          "mt-4 overflow-x-auto rounded-xl border border-zinc-200 pb-4 text-zinc-600 transition duration-500 dark:border-zinc-600",
        )}
      >
        {!isLoading ? (
          <div className="min-h-[500px] w-full min-w-[1200px]">
            <table className="w-full">{children}</table>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </TableContext.Provider>
  );
};

export function useTable() {
  const context = React.useContext(TableContext);

  if (!context) {
    throw new Error("Header must be used within a <Table> component");
  }

  return context;
}

const Header = ({
  checkbox = false,
  data,
  toggleSelectAll,
  allSelected,
}: {
  checkbox?: boolean;
  data: (string | number | React.ReactNode)[];
  toggleSelectAll: () => void;
  allSelected: boolean;
}) => {
  const { columns } = useTable();
  return (
    <thead className="w-full rounded-2xl border-b border-b-zinc-200 bg-zinc-100 text-left transition duration-500 dark:border-b-zinc-600 dark:bg-zinc-600 dark:text-white">
      <tr className="grid py-4" style={{ gridTemplateColumns: columns }}>
        <th></th>
        {checkbox ? (
          <th className="flex items-center">
            <input
              onChange={toggleSelectAll}
              checked={allSelected}
              id="indigoCheckBox"
              type="checkbox"
              className="h-4 w-4"
            />
          </th>
        ) : null}
        {data.map((d, i) => (
          <th key={i}>{d}</th>
        ))}
      </tr>
    </thead>
  );
};

const Body = <T,>({
  data,
  render,
}: {
  data?: T[];
  render: (item: T) => React.ReactNode;
}) => {
  if (!data?.length) {
    return (
      <tbody className="flex h-full min-h-[500px] items-center justify-center text-black transition duration-500 dark:text-white">
        <tr>
          <td>No data</td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className="text-black transition duration-500 dark:text-white">
      {data?.map(render)}
    </tbody>
  );
};

const Row = ({ children }: ChildrenProp) => {
  const { columns } = useTable();
  return (
    <tr
      className="grid border-zinc-200 py-1.5 transition duration-500 not-last:border-b not-last:border-zinc-200 hover:bg-zinc-100 dark:not-last:border-zinc-600 dark:hover:bg-zinc-700"
      style={{ gridTemplateColumns: columns }}
    >
      {children}
    </tr>
  );
};

const Footer = () => {};

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
