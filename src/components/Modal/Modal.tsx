import { FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

import styles from "./Modal.module.css";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export const Modal: FC<Required<PropsWithChildren> & ModalProps> = ({
  children,
  onClose,
  open,
}) => {
  if (!open) return null;

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
};
