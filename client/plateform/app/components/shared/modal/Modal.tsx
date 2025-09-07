import { Dialog } from "primereact/dialog";
import React, { Children } from "react";
import type { ModalPropsType } from "./Modal.types";
import { useTranslation } from "react-i18next";
import Button from "../button/Button";
import { CloseIcon } from "~/assets/icons/Icon";

const Modal = ({
  open,
  onClose,
  dismissableMask = true,
  modalClassName,
  title,
  children,
}: ModalPropsType) => {
  const { t } = useTranslation();
  return (
    <Dialog
      visible={open}
      onHide={onClose}
      dismissableMask={dismissableMask}
      className={`${modalClassName ?? ""} w-full max-w-[424px] bg-white rounded-lg`}
    >
      <div className="h-full flex flex-col gap-4 justify-between">
        <header
          className={` pb-4 border-b border-neutral-white-200 flex items-center ${title ? "justify-between" : "justify-end"} gap-1 `}
        >
          {title && (
            <h5 className="h5 font-semibold text-neutral-black-900">
              {t(title)}
            </h5>
          )}
          <Button
            icon={<CloseIcon />}
            size="xs"
            variant="tertiery"
            hasHover={false}
            handleClick={onClose}
          />
        </header>
        <div className="flex-1">{children}</div>
      </div>
    </Dialog>
  );
};

export default Modal;
