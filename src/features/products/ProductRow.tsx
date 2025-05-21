import {
  BoxIcon,
  CopyIcon,
  EllipsisVerticalIcon,
  ImageIcon,
  PencilIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import { useProductOperations } from "../../services/products/useProductOperations";
import type { Product } from "../../types/types";
import Badge from "../../ui/Badge";
import { Modal } from "../../ui/Modal";
import Table from "../../ui/Table";
import { AddProductForm } from "./AddProductForm";
import Tooltip from "../../ui/Tooltip";
import { Button } from "../../ui/Button";
import { Heading } from "../../ui/Heading";
import { Delete } from "../../ui/Delete";

export const ProductRow = ({ product }: { product: Product }) => {
  const { mutate } = useProductOperations();
  const { name, imageUrl, category, stock, price, isActive } = product;

  function duplicateProduct() {
    mutate({ product, action: "duplicate" });
  }

  function deleteProduct() {
    mutate({ product, action: "delete" });
  }

  return (
    <Table.Row>
      <td></td>
      <td className="flex items-center">
        <input id="indigoCheckBox" type="checkbox" className="h-4 w-4" />
      </td>
      <td className="flex flex-row items-center gap-4 px-4">
        {imageUrl ? (
          <img
            src={imageUrl as string}
            width={28}
            alt={name}
            className="inline"
          />
        ) : (
          <ImageIcon size={24} />
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
        <Modal>
          <Tooltip.Menu>
            <Tooltip.Toggle id={product.id} />
            <Tooltip.List id={product.id}>
              <Tooltip.Button
                handle={duplicateProduct}
                className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-zinc-700"
              >
                <CopyIcon size={16} />
                Duplicate
              </Tooltip.Button>

              <Modal.Open openName="edit">
                <Tooltip.Button className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-zinc-700">
                  <PencilIcon size={16} />
                  Edit
                </Tooltip.Button>
              </Modal.Open>

              <Modal.Open openName="delete">
                <Tooltip.Button
                  handle={deleteProduct}
                  className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-zinc-700"
                >
                  <Trash2Icon size={16} />
                  Delete
                </Tooltip.Button>
              </Modal.Open>
            </Tooltip.List>

            <Modal.Window name="delete" size="md">
              <Delete handle={deleteProduct} />
            </Modal.Window>

            <Modal.Window name="edit">
              <AddProductForm product={product} />
            </Modal.Window>
          </Tooltip.Menu>
        </Modal>
      </td>
    </Table.Row>
  );
};
