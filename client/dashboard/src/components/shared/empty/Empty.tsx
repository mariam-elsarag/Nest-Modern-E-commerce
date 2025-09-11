import { useTranslation } from "react-i18next";
import { EmptyStatusImg } from "../../../assets/images/Images";
import type { EmptyPropsType } from "./Empty.types";
import Button from "../button/Button";
import { currentLanguageCode } from "../../../common/utils/switchLang";
import { ArrowIcon } from "../../../assets/icons/Icon";

const Empty = ({
  image = EmptyStatusImg,
  title,
  des,
  btnName,
  btnCta,
  size,
}: EmptyPropsType) => {
  const { t } = useTranslation();
  return (
    <figure className="flex flex-col items-center justify-center text-center gap-6 max-w-[273px] w-full mx-auto ">
      <img src={image} alt="empty" className="w-16 h-16" />
      {title && (
        <h3 className="h3 font-bold text-neutral-black-900">{t(title)}</h3>
      )}
      {des && <p className="body text-neutral-black-500">{t(des)}</p>}
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
    </figure>
  );
};

export default Empty;
