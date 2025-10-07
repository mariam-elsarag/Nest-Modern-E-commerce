import React from "react";
import type { ConfirmationModalProps } from "./Confirmation_Modal.types";
import { Dialog } from "primereact/dialog";
import Button from "../button/Button";
import { useTranslation } from "react-i18next";
import { TrashIcon, WarningIcon } from "../../../assets/icons/Icon";

const Confirmation_Modal = ({
  open,
  onClose,
  variant = "delete",
  title,
  description,
  mainBtnCta,
  mainBtnText,
  loading,
}: ConfirmationModalProps) => {
  const { t } = useTranslation();
  const buttonsStle = {
    delete: "error",
    warning: "primary",
  };
  const btnText = mainBtnText ?? variant;
  const icon = {
    delete: <TrashIcon />,
    warning: <WarningIcon />,
  };
  return (
    <Dialog
      className="max-w-[300px] md:max-w-[95%] w-[90%] md:w-[400px] "
      visible={open}
      onHide={onClose}
      draggable={false}
      dismissableMask
    >
      <div className="flex flex-col items-center justify-center w-full gap-6">
        <header>
          <span className="rounded-full flex items-center justify-center w-14 h-14 bg-neutral-white-100/60">
            {icon[variant]}
          </span>
        </header>
        <div className="text-center flex flex-col gap-3 items-center justify-center">
          {title && (
            <h2 className="text-neutral-black-900 font-semibold h5">
              {t(title)}
            </h2>
          )}
          {description && (
            <p className="body text-neutral-black-500">{t(description)}</p>
          )}
        </div>
        <footer className="flex items-center flex-row-reverse gap-2 w-full">
          <Button
            variant={buttonsStle[variant]}
            size="md"
            className="!w-full"
            round="lg"
            text={btnText}
            loading={loading}
            handleClick={mainBtnCta}
          />
          <Button
            variant="outline"
            size="md"
            className="!w-full"
            round="lg"
            text="cancel"
            handleClick={onClose}
            disabled={loading}
          />
        </footer>
      </div>
    </Dialog>
  );
};

export default Confirmation_Modal;
