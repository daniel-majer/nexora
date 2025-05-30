import { Modal } from "../../ui/Modal";
import { Button } from "../../ui/Button";
import { PlusIcon } from "lucide-react";
import { AddProductForm } from "./AddProductForm";

export const AddProduct = () => {
  return (
    <Modal>
      <Modal.Open openName="add-product">
        <Button size="md" className="flex items-center gap-2">
          <PlusIcon className="size-3 sm:size-4" />
          <span>Add product</span>
        </Button>
      </Modal.Open>

      <Modal.Window name="add-product">
        <AddProductForm />
      </Modal.Window>
    </Modal>
  );
};
