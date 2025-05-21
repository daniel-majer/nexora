import { BoxIcon, EllipsisVerticalIcon, ImageIcon, XIcon } from "lucide-react";
import { useProductOperations } from "../../services/products/useProductOperations";
import type { Product } from "../../types/types";
import Badge from "../../ui/Badge";
import { Modal } from "../../ui/Modal";
import Table from "../../ui/Table";
import { AddProductForm } from "./AddProductForm";

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
        <div
          onClick={duplicateProduct}
          className="cursor-pointer rounded-sm p-2 hover:bg-zinc-200"
        >
          <EllipsisVerticalIcon />
        </div>
        <div
          onClick={deleteProduct}
          className="cursor-pointer rounded-sm p-2 hover:bg-zinc-200"
        >
          <XIcon />
        </div>

        <Modal>
          <Modal.Open openName="edit">
            <div className="cursor-pointer rounded-sm p-2 hover:bg-zinc-200">
              <BoxIcon />
            </div>
          </Modal.Open>
          <Modal.Window name="edit">
            <AddProductForm product={product} />
          </Modal.Window>
        </Modal>
      </td>
    </Table.Row>
  );
};
