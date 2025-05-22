import React from "react";

export const useOutsideClose = ({
  setOpenName,
}: {
  setOpenName: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenName(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(".btn-helper-class")) {
        return;
      }

      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpenName(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, []);

  return { modalRef };
};
