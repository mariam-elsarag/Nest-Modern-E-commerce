import React, { useRef } from "react";
import Button from "../button/Button";
import { MenuIcon, MoreIcon } from "../../../assets/icons/Icon";
import { OverlayPanel } from "primereact/overlaypanel";
import type { MenuPropsTypes } from "./Menue.types";
import { useTranslation } from "react-i18next";

const Menu = ({ list }: MenuPropsTypes) => {
  const op = useRef(null);
  const { t } = useTranslation();
  return (
    <div>
      <Button
        icon={<MoreIcon />}
        size="xs"
        variant="tertiery"
        handleClick={(e) => {
          op.current.toggle(e);
        }}
      />
      <OverlayPanel ref={op} className="menu_op">
        <div className="flex flex-col gap-2 py-1 px-2">
          {list?.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-1 py-2 px-1 rounded-[4px] transition-all ease-in-out duration-300 hover:bg-neutral-white-100 cursor-pointer"
            >
              {item?.icon && <span>{item?.icon}</span>}
              <span
                className={`${
                  item?.textClassName ?? ""
                } text-neutral-black-500 body font-medium capitalize`}
              >
                {t(item?.name)}
              </span>
            </div>
          ))}
        </div>
      </OverlayPanel>
    </div>
  );
};

export default Menu;
