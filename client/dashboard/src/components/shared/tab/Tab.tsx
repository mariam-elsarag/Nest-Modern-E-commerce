import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Spinner from "../loaders/Spinner";
import { NavLink } from "react-router-dom";
import type { TapProps } from "./Tab.types";

const Tab = ({
  type = "filter",
  list,
  currentValue,
  setValue,
  containerClassName = "",
  loading,
  isScroll = false,
  onClick,
}: TapProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    containerRef.current.style.cursor = "grabbing";
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    containerRef.current.style.cursor = "grab";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjust scroll speed
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  if (isScroll) {
    if (!containerRef.current) return;

    return (
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUpOrLeave}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={containerRef}
        className={`w-full p-2 sm:p-3 layer shadow_sm  flex items-center gap-1 sm:gap-2 overflow-x-auto whitespace-nowrap cursor-grab hide_scroll_bar ${containerClassName}`}
      >
        <List_Item
          type={type}
          list={list}
          currentValue={currentValue}
          setValue={setValue}
          loading={loading}
          onClick={onClick}
        />
      </div>
    );
  }
  return (
    <div className="w-full p-2 sm:p-3 layer shadow_sm  flex items-center gap-1 sm:gap-2 overflow-x-hidden">
      <List_Item
        type={type}
        list={list}
        currentValue={currentValue}
        setValue={setValue}
        loading={loading}
        onClick={onClick}
      />
    </div>
  );
};
const List_Item = ({
  type = "filter",
  list,
  currentValue,
  setValue,
  loading,
  onClick,
}: TapProps) => {
  const { t } = useTranslation();
  const baseStyle = `  body  p-2  gap-2 cursor-pointer rounded-lg flex items-center`;

  const handleClick = (itemValue, fieldName) => {
    setValue((pre) => ({ ...pre, [fieldName]: itemValue }));

    if (onClick) {
      onClick(itemValue);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center w-full">
          <Spinner />
        </div>
      ) : (
        list?.map((item, index) => {
          let isActive =
            (item?.default &&
              !(currentValue || currentValue?.[item?.fieldName])) ||
            currentValue?.[item?.fieldName];

          return type === "navLink" ? (
            <NavLink
              key={index}
              to={item?.link}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "bg-neutral-white-100 text-neutral-black-500"
                    : "text-neutral-black-500"
                } ${baseStyle}`
              }
            >
              {t(item?.link_name)}
            </NavLink>
          ) : (
            <div
              key={index}
              onClick={() => handleClick(item?.value, item?.fieldName)}
              className={`${baseStyle} ${
                isActive
                  ? "bg-neutral-white-100 text-neutral-black-500"
                  : "text-neutral-black-500"
              }`}
            >
              <span className="body whitespace-nowrap">{t(item?.name)}</span>
              {item?.image && (
                <figure className="w-5 h-5 sm:w-6 sm:h-6 ">
                  <img
                    src={item?.image}
                    alt="avatar"
                    className="w-full h-full rounded-full object-contain"
                  />
                </figure>
              )}
              {item?.badge_count > 0 && (
                <span
                  dir="ltr"
                  className={`flex items-center text-center label_lg font-light min-w-4 min-h-4 sm:min-w-5 sm:min-h-5 py-0.5 px-1 rounded-full ${
                    isActive
                      ? "bg-primary-100 text-primary-900 "
                      : "bg-neutral-white-200 text-neutral-black-500 "
                  } `}
                >
                  {item?.badge_count > 100 ? "+99" : item?.badge_count}
                </span>
              )}
            </div>
          );
        })
      )}
    </>
  );
};
export default Tab;
