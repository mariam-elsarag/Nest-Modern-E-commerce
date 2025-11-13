import type React from "react";

export type ModalPropsType = {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactElement;
  className?: string;
};
