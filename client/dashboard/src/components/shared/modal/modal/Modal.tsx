import { Dialog } from "primereact/dialog";
import type { ModalPropsType } from "./Modal.types";
import { useTranslation } from "react-i18next";

const Modal = ({ open, onClose, title, children }: ModalPropsType) => {
  const { t } = useTranslation();
  return (
    <Dialog
      className="max-w-[300px] md:max-w-[95%] w-[90%] md:w-[450px] "
      visible={open}
      onHide={onClose}
      draggable={false}
      dismissableMask
    >
      <div className="flex flex-col gap-3">
        <header className="border-b border-neutral-black-100 pb-2">
          <h2 className="h5 text-neutral-black-600">{t(title)}</h2>
        </header>
        {children && <div className="flex-1 flex flex-col">{children}</div>}
      </div>
    </Dialog>
  );
};

export default Modal;
