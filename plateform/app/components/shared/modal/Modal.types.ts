export type ModalPropsType = {
  open: boolean;
  onClose: () => void;
  dismissableMask?: boolean;
  title?: string;
  children?: React.ReactNode;
  modalClassName?: string;
};
