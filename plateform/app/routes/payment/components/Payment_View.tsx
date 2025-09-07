import React from "react";
import { useTranslation } from "react-i18next";
import { ArrowIcon } from "~/assets/icons/Icon";
import { currentLanguageCode } from "~/common/utils/switchLang";
import Button from "~/components/shared/button/Button";
type PaymentViewProps = {
  image: string;
  title: string;
  des: string;
  btnName?: string;
  btnCta?: () => void;
};
const Payment_View = ({
  image,
  title,
  des,
  btnName,
  btnCta,
}: PaymentViewProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-10 items-center text-center justify-center">
      <figure className="flex flex-col items-center justify-center gap-5 text-center">
        <img src={image} className="h-[160px]" alt={t(title)} />
        <h2 className="h3 font-bold text-neutral-black-900">{t(title)}</h2>
        <p className="body text-neutral-black-500">{t(des)}</p>
      </figure>
      {btnName && (
        <Button
          text={btnName}
          handleClick={btnCta}
          icon={
            <span className={currentLanguageCode === "en" ? "rotate-180" : ""}>
              <ArrowIcon fill="var(--color-neutral-white-100)" />
            </span>
          }
        />
      )}
    </div>
  );
};

export default Payment_View;
