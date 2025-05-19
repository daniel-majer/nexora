import React from "react";
import type { ChildrenProp, Product } from "../types/types";
import { Spinner } from "./Spinner";
import clsx from "clsx";

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
          isLoading && "flex items-center",
          "mt-12 min-h-3/4 overflow-x-auto rounded-xl border border-zinc-200 pb-4 text-zinc-600 transition duration-500 dark:border-zinc-600",
        )}
      >
        {!isLoading ? (
          <div className="w-full min-w-[1200px]">
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

const Header = ({ children }: ChildrenProp) => {
  const { columns } = useTable();
  return (
    <thead className="w-full rounded-2xl bg-zinc-100 text-left transition duration-500 dark:bg-zinc-600 dark:text-white">
      <tr className="grid py-4" style={{ gridTemplateColumns: columns }}>
        {children}
      </tr>
    </thead>
  );
};

const Body = ({
  products,
  render,
}: {
  products?: Product[];
  render: (product: Product) => React.ReactNode;
}) => {
  return (
    <tbody className="text-black transition duration-500 dark:text-white">
      {products?.map(render)}
    </tbody>
  );
};

const Row = ({ children }: ChildrenProp) => {
  const { columns } = useTable();
  return (
    <tr
      className="grid py-3 transition duration-500 not-last:border-b not-last:border-zinc-200 hover:bg-zinc-100 dark:not-last:border-zinc-600 dark:hover:bg-zinc-700"
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
