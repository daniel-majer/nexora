import { EllipsisVerticalIcon } from "lucide-react";
import React, { type ComponentProps } from "react";
import { useOutsideClose } from "../hooks/useOutsideClose";

type ContextProps = {
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
  setPosition: React.Dispatch<React.SetStateAction<PositionProps>>;
  selectedId: string | null;
  position: PositionProps;
};

type PositionProps = { x: number; y: number };

const TooltipContext = React.createContext<ContextProps | undefined>(undefined);

const Tooltip = ({ children }: { children: React.ReactNode }) => {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [position, setPosition] = React.useState<PositionProps>({ x: 0, y: 0 });

  const values = React.useMemo(
    () => ({
      selectedId,
      setSelectedId,
      setPosition,
      position,
    }),
    [position, selectedId],
  );

  return (
    <TooltipContext.Provider value={values}>{children}</TooltipContext.Provider>
  );
};

export const useTooltip = () => {
  const content = React.useContext(TooltipContext);
  if (!content) {
    throw new Error("Menu must be used within a <Menu> component");
  }
  return content;
};

const Toggle = ({ id }: { id: string }) => {
  const { selectedId, setSelectedId, setPosition } = useTooltip();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    const target = e.target as HTMLElement;
    const button = target.closest("button");

    if (!button) return; // Safety check

    const rect = button.getBoundingClientRect();
    console.log(rect);

    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 20,
    });

    selectedId === null || selectedId !== id
      ? setSelectedId(id)
      : setSelectedId(null);
  };
  return (
    <button
      onClick={handleClick}
      className="btn-helper-class cursor-pointer rounded-sm p-2 hover:bg-zinc-200"
    >
      <EllipsisVerticalIcon className="text-zinc-400-600" />
    </button>
  );
};

const List = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const { selectedId, setSelectedId, position } = useTooltip();
  const { modalRef } = useOutsideClose({ setOpenName: setSelectedId });
  console.log(position);

  if (selectedId !== id) return null;

  return (
    <div
      className="absolute top-full right-0 z-50 mt-1 w-40 rounded-xl border border-zinc-200 bg-white p-2 shadow-lg dark:bg-zinc-800"
      ref={modalRef}
    >
      {children}
    </div>
  );
};

function Menu({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex items-center justify-end">{children}</div>
  );
}

function Button({
  children,
  handle,
  ...rest
}: {
  children: React.ReactNode;
  handle?: () => void;
} & ComponentProps<"button">) {
  const { setSelectedId } = useTooltip();

  function handleOperation() {
    console.log("edit");

    handle?.();
    setSelectedId(null);
  }

  return (
    <button onClick={handleOperation} {...rest}>
      {children}
    </button>
  );
}

Tooltip.Toggle = Toggle;
Tooltip.List = List;
Tooltip.Menu = Menu;
Tooltip.Button = Button;
export default Tooltip;
