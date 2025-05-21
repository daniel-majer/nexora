import React, { cloneElement, type ButtonHTMLAttributes } from "react";
import { createPortal } from "react-dom";
import { useOutsideClose } from "../hooks/useOutsideClose";
import type { keyof } from "zod/v4";

type SizeProps = keyof typeof modalSize;

const modalSize = {
  xs: "max-w-xl",
  md: "max-w-2xl",
  lg: "max-w-3xl",
};

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

  const cloneChildren = cloneElement(children!, {
    onClick: () => setOpenName(openName),
  });

  return cloneChildren;
};

const Window = ({
  children,
  name,
  size = "lg",
}: {
  children: React.ReactElement<any>;
  name: string;
  size?: SizeProps;
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
          className={`w-full rounded-lg bg-white p-6 shadow-lg dark:border dark:border-zinc-600 dark:bg-zinc-800 ${modalSize[size]}`}
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
