import React, {
  cloneElement,
  use,
  type ButtonHTMLAttributes,
  type MouseEventHandler,
} from "react";
import { createPortal } from "react-dom";
import { useOutsideClose } from "../hooks/useOutsideClose";

type ModalContextType = {
  openName: string | null;
  setOpenName: React.Dispatch<React.SetStateAction<string | null>>;
};

const ModalContext = React.createContext<ModalContextType | undefined>(
  undefined,
);

export const Modal = ({ children }: { children: React.ReactNode }) => {
  const [openName, setOpenName] = React.useState<string | null>(null);

  return (
    <ModalContext.Provider value={{ openName, setOpenName }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const content = React.useContext(ModalContext);
  if (!content) {
    throw new Error("Modal must be used within a <Modal> component");
  }
  return content;
};

const Open = ({
  children,
  openName,
}: {
  children: React.ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>;
  openName: string;
}) => {
  const { setOpenName } = useModal();

  const cloneChildren = cloneElement(children, {
    onClick: () => setOpenName(openName),
  });

  return cloneChildren;
};

const Window = ({
  children,
  name,
}: {
  children: React.ReactElement<any>;
  name: string;
}) => {
  const { openName, setOpenName } = useModal();
  const { modalRef } = useOutsideClose({ setOpenName });

  if (openName !== name) return null;

  const cloneChildren = cloneElement(children, {
    close: () => setOpenName(null),
  });

  return createPortal(
    <div>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs">
        <div
          ref={modalRef}
          className="min-h-96 w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-800 dark:border dark:border-zinc-600"
        >
          {cloneChildren}
        </div>
      </div>
    </div>,
    document.body,
  );
};

Modal.Open = Open;
Modal.Window = Window;
