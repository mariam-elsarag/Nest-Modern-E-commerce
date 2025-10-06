export type ConfirmationModalProps = {
  open: boolean;
  onClose: () => void;
  variant?: "delete" | "warning";
  title?: string;
  description?: string;
  mainBtnCta: () => void;
  mainBtnText?: string;
  loading?: boolean;
};
