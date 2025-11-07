import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { ArrowIcon } from "~/assets/icons/Icon";
import { CategoryHeroImg } from "~/assets/images/Image";
import { currentLanguageCode } from "~/common/utils/switchLang";
import Button from "~/components/shared/button/Button";

const Category = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <section className="home_category_cta_bg min-h-[304px] container py-10 grid md:grid-cols-2 gap-10 justify-center text-center md:justify-baseline md:text-start ">
      <div className="flex flex-col gap-6 justify-center items-center md:items-start">
        <h2 className=" text-neutral-black-900 font-bold h3">
          {t("home.category.title")}
        </h2>
        <p className="text-neutral-black-500 body max-w-[462px]">
          {t("home.category.description")}
        </p>
        <Button
          text="home.category.start_browsing"
          icon={
            <span className={currentLanguageCode === "en" ? "rotate-180" : ""}>
              <ArrowIcon fill="white" />
            </span>
          }
          handleClick={() => {
            navigate("/product");
          }}
        />
      </div>
      <figure className="flex justify-center md:justify-end">
        <img src={CategoryHeroImg} alt="category image" className="h-[311px]" />
      </figure>
    </section>
  );
};

export default Category;
