import {
  CopyIcon,
  ImageIcon,
  PencilIcon,
  StarIcon,
  Trash2Icon,
} from "lucide-react";
import type { Product } from "../../types/types";
import Badge from "../../ui/Badge";
import { Delete } from "../../ui/Delete";
import { Modal } from "../../ui/Modal";
import Table from "../../ui/Table";
import Tooltip from "../../ui/Tooltip";
import { AddProductForm } from "./AddProductForm";
import { useProductOperations } from "./useProductOperations";

export const ProductRow = ({
  product,
  productsDelete,
  setProductsDelete,
  allSelected,
  setAllSelected,
}: {
  product: Product;
  productsDelete: string[];
  setProductsDelete: React.Dispatch<React.SetStateAction<string[]>>;
  allSelected: boolean;
  setAllSelected: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { mutate, mutateAsync, isPending } = useProductOperations();
  const { name, imageUrl, category, stock, price, isActive, reviews, rating } =
    product;
  const isChecked = productsDelete.includes(product.id);

  function duplicateProduct() {
    mutate({ product, action: "duplicate" });
  }

  async function deleteProduct(id: string) {
    await mutateAsync(
      { product, action: "delete" },
      {
        onSuccess: () => {
          const reCalculate = productsDelete.filter((prod) => prod !== id);
          setProductsDelete(reCalculate);
        },
        onError: (error) => console.error("Error deleting product:", error),
      },
    );
  }

  function handleCheckbox() {
    if (allSelected) setAllSelected(false);
    if (productsDelete.includes(product.id)) {
      const deleteAction = productsDelete.filter((prod) => prod !== product.id);
      return setProductsDelete(deleteAction);
    }
    setProductsDelete((prods) => [...prods, product.id]);
  }

  return (
    <Table.Row>
      <td></td>
      <td className="flex items-center">
        <input
          onChange={handleCheckbox}
          checked={isChecked}
          id="indigoCheckBox"
          type="checkbox"
          className="h-4 w-4"
        />
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
        <Badge variant={isActive === "true" ? "success" : "danger"}>
          {isActive === "true" ? "Active" : "Inactive"}
        </Badge>
      </td>
      <td className="flex items-center">{reviews}</td>
      <td className="flex items-center">
        <span className="flex gap-2">
          <Badge
            variant={
              rating! > 4 ? "success" : rating! > 3 ? "warning" : "danger"
            }
          >
            <span className="flex gap-2 py-0.5">
              {rating}
              <StarIcon size={16} className={` `} />
            </span>
          </Badge>
        </span>
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
                <Tooltip.Button className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-zinc-700">
                  <Trash2Icon size={16} />
                  Delete
                </Tooltip.Button>
              </Modal.Open>
            </Tooltip.List>

            <Modal.Window name="delete" size="md">
              <Delete
                isPending={isPending}
                handle={() => deleteProduct(product.id)}
                title="Delete product"
                message="Are you sure you want to delete this product? This action cannot be undone."
              />
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
