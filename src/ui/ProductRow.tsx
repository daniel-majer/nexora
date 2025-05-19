import React from "react";
import Table from "./Table";
import type { Product } from "../types/types";
import { EllipsisVerticalIcon, ImageIcon } from "lucide-react";
import Badge from "./Badge";

export const ProductRow = ({ product }: { product: Product }) => {
  const { name, imageUrl, category, stock, price, isActive } = product;

  return (
    <Table.Row>
      <td></td>
      <td className="flex items-center">
        <input id="indigoCheckBox" type="checkbox" className="h-4 w-4" />
      </td>
      <td className="flex flex-row items-center gap-4 px-4">
        {imageUrl ? (
          <img src={imageUrl} width={28} alt={name} className="inline" />
        ) : (
          <ImageIcon size={48} className="" />
        )}
        <span>{name}</span>
      </td>
      <td className="flex items-center">
        {category[0]?.toUpperCase() + category.slice(1)}
      </td>
      <td className="flex items-center">
        <Badge
          variant={
            Number(stock) === 0 ? "danger" : stock < 50 ? "warning" : "success"
          }
        >
          {Number(stock) === 0 ? "Out of stock" : stock + " pcs"}
        </Badge>
      </td>
      <td className="flex items-center">{price} €</td>
      <td className="flex items-center">
        <Badge variant={isActive ? "success" : "danger"}>
          {isActive ? "Active" : "Inactive"}
        </Badge>
      </td>
      <td className="flex items-center">
        <div className="cursor-pointer rounded-sm p-2 hover:bg-zinc-200">
          <EllipsisVerticalIcon />
        </div>
      </td>
    </Table.Row>
  );
};
