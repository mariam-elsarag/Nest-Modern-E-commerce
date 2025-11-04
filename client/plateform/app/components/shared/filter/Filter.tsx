import React, { useState } from "react";
import type { FilterPropsType } from "./Fiter.types";
import { useTranslation } from "react-i18next";
import { Checkbox } from "primereact/checkbox";
import { currentLanguageCode } from "~/common/utils/switchLang";
import Button from "../button/Button";
import { MenuIcon } from "~/assets/icons/Icon";
import useOutsideClick from "~/hooks/useOutsideClick";

const Filter = ({ data, filter, setFilter }: FilterPropsType) => {
  const { t } = useTranslation();
  const [toggleMenu, setToggleMenu] = useState(false);
  const ref = useOutsideClick(() => setToggleMenu(false));
  const handleSelect = (
    id: number,
    fieldName: string,
    type: "multiselect" | "single"
  ) => {
    setFilter((prev) => {
      if (type === "multiselect") {
        const current = prev[fieldName] || [];
        const exists = current.includes(id);

        return {
          ...prev,
          [fieldName]: exists
            ? current.filter((itemId: number) => itemId !== id)
            : [...current, id],
        };
      } else {
        return {
          ...prev,
          [fieldName]: id,
        };
      }
    });
  };

  return (
    <div className="">
      <Button
        icon={<MenuIcon />}
        size="xs"
        variant="tertiery"
        handleClick={() => setToggleMenu((pre) => !pre)}
        className="flex md:hidden ms-auto"
      />
      <div
        className={`flex   ${
          toggleMenu ? "  fixed inset-0 bg-black/10 h-full z-20" : ""
        } md:relative md:h-fit md:bg-transparent `}
      >
        <aside
          ref={ref}
          className={` ${toggleMenu ? "flex  translate-x-0" : "-translate-x-full  "} fixed top-0 bg-white  z-20 !w-[248px] start-0 h-dvh transition-all ease-in-out duration-300 md:top-auto md:translate-x-0 md:start-[0] md:h-fit md:w-fit md:relative md:flex flex-col gap-10 border border-neutral-black-100 pt-6 pb-8 px-3 rounded-[6px] `}
        >
          {data?.map((item, index) => (
            <>
              <section className="flex flex-col gap-4" key={item?.fieldName}>
                <h3 className="body font-medium text-neutral-black-900 capitalize">
                  {t(item?.title)}
                </h3>
                <ul
                  className={`flex ${item?.type === "multiselect" ? "flex-col" : "flex-row items-center flex-wrap"} gap-2.5`}
                >
                  {item?.list?.map((list, index) =>
                    item?.variant === "color" ? (
                      <li
                        key={index}
                        className={`color_container ${filter?.[item?.fieldName] === list?.id ? "border-neutral-black-900" : "border-neutral-black-100 "}`}
                        onClick={() => {
                          handleSelect(list?.id, item?.fieldName, item?.type);
                        }}
                      >
                        <span
                          style={{ background: list?.color }}
                          className="w-6 h-6 flex rounded-full"
                        />
                      </li>
                    ) : item?.variant === "size" ? (
                      <li
                        key={index}
                        className={`size_container label ${filter?.[item?.fieldName] === list?.id ? "border-neutral-black-900" : "border-neutral-black-100 "}`}
                        onClick={() => {
                          handleSelect(list?.id, item?.fieldName, item?.type);
                        }}
                      >
                        {list?.size}
                      </li>
                    ) : item?.variant === "checkbox" ? (
                      <li key={index} className="flex items-center gap-2.5 ">
                        <Checkbox
                          inputId={`category[${list?.id}]`}
                          checked={filter?.[item?.fieldName]?.includes(
                            list?.id
                          )}
                          onChange={(e) => {
                            handleSelect(list?.id, item?.fieldName, item?.type);
                          }}
                        />
                        <label
                          htmlFor={`category[${list?.id}]`}
                          className="cursor-pointer text-neutral-black-500 body truncate capitalize"
                        >
                          {currentLanguageCode === "en"
                            ? list?.title
                            : list?.title_ar}
                        </label>
                      </li>
                    ) : (
                      ""
                    )
                  )}
                </ul>
              </section>
              {index !== data?.length - 1 && (
                <div className="w-full h-[1px] bg-neutral-white-200" />
              )}
            </>
          ))}
        </aside>
      </div>
    </div>
  );
};

export default Filter;
