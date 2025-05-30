import { useNavigate } from "react-router";
import { Button } from "../../ui/Button";
import { Delete } from "../../ui/Delete";
import { Modal } from "../../ui/Modal";
import { useDeleteUpdateOrder } from "./useDeleteUpdateOrder";

export const OrderActionBtns = ({
  state,
  status,
}: {
  state?: string;
  status: string;
}) => {
  const { isPending, mutateAsync } = useDeleteUpdateOrder();
  const navigate = useNavigate();

  function saveChanges(type: string | undefined = state) {
    mutateAsync(
      { type },
      {
        onSuccess: () => {
          navigate(-1);
        },
      },
    );
  }

  return (
    <div className="flex justify-end gap-2 sm:gap-4">
      <Modal>
        <Modal.Open openName="cancel">
          <Button
            disabled={status === "delivered" || status === "cancelled"}
            size="md"
            variant="delete"
            className="rounded-lg border border-red-500 px-2 py-1 font-semibold text-red-600 sm:px-5 sm:py-2.5"
          >
            Cancel Order
          </Button>
        </Modal.Open>
        <Modal.Open openName="save">
          <Button
            disabled={status === "delivered" || status === "cancelled"}
            size="md"
            className="rounded-lg px-2 py-1 font-semibold text-white sm:px-5 sm:py-2.5"
          >
            Save Changes
          </Button>
        </Modal.Open>

        <Modal.Window name="cancel">
          <Delete
            message="Are you sure you want to cancel this order? This action cannot be undone."
            title="Cancel order"
            isPending={isPending}
            handle={() => saveChanges("cancelled")}
          />
        </Modal.Window>
        <Modal.Window name="save">
          <Delete
            message="Are you sure you want to save order status settings?"
            title="Confirm changes"
            isPending={isPending}
            type="primary"
            handle={() => saveChanges()}
          />
        </Modal.Window>
      </Modal>
    </div>
  );
};
