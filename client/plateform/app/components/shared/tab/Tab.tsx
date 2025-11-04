import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ListItemProps, TabPropsType } from "./Tab.types";
import { NavLink } from "react-router";

const Tab = ({
  list = [],
  type = "filter",
  variant = "primary",
  setValue,
  fieldName,
  currentValue,
  isScrollable = true,
  direction = "row",
  containerClassName,
}: TabPropsType) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    containerRef.current.style.cursor = "grabbing";
  };

  const handleMouseUpOrLeave = () => {
    if (!containerRef.current) return;
    setIsDragging(false);
    containerRef.current.style.cursor = "grab";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  if (!isScrollable) {
    return (
      <aside
        className={`flex ${direction === "row" ? "" : "flex-col"}  gap-4 ${containerClassName ?? ""} `}
      >
        <Tap_Content
          list={list}
          type={type}
          variant={variant}
          setValue={setValue}
          fieldName={fieldName}
          currentValue={currentValue}
        />
      </aside>
    );
  }
  return (
    <aside
      className={`flex gap-4 overflow-x-auto cursor-grab select-none ${containerClassName ?? ""}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUpOrLeave}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUpOrLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={containerRef}
    >
      <Tap_Content
        list={list}
        type={type}
        variant={variant}
        setValue={setValue}
        fieldName={fieldName}
        currentValue={currentValue}
      />
    </aside>
  );
};
const Tap_Content = ({
  list = [],
  type = "filter",
  variant = "primary",
  setValue,
  fieldName,
  currentValue,
}: TabPropsType) => {
  const { t } = useTranslation();

  const handleClick = (val: string | number | undefined) => {
    if (!setValue) return;
    if (type === "filter" && fieldName) {
      setValue((prev: any) => ({ ...prev, [fieldName]: val }));
    } else if (type === "click") {
      setValue(val);
    }
  };

  const styles = {
    primary: `px-4 py-[3px] rounded-full cursor-pointer body font-medium border text-neutral-black-500 border-transparent flex items-center gap-2`,
    secondary:
      " cursor-pointer flex items-center gap-2 py-2 px-6 h-[41px] rounded-lg !text-neutral-black-500",
  };
  const activeStyles = {
    primary: "!text-neutral-black-800 !border-neutral-white-200",
    secondary: `bg-neutral-white-100 !text-neutral-black-900`,
  };
  return (
    <>
      {list.map((item) => {
        const isActive =
          type !== "navigation" &&
          ((!currentValue && item.default) ||
            currentValue[fieldName] === item.value ||
            currentValue === item.value);
        const Icon = item.icon;

        const commonClasses = `${styles[variant]} ${isActive ? activeStyles[variant] : ""}`;

        return type === "navigation" ? (
          <NavLink
            key={item.title}
            to={item.to || ""}
            className={({ isActive }) =>
              `${styles[variant]} ${isActive ? activeStyles[variant] : ""}`
            }
          >
            {Icon && (
              <Icon
                fill={
                  isActive
                    ? "var(--color-neutral-black-900)"
                    : "var(--color-neutral-black-500)"
                }
              />
            )}
            {t(item.title)}
          </NavLink>
        ) : (
          <span
            key={item.title}
            role="tab"
            aria-selected={isActive}
            onClick={() => handleClick(item.value)}
            className={commonClasses}
          >
            {Icon && (
              <Icon
                fill={
                  isActive
                    ? "var(--color-neutral-black-900)"
                    : "var(--color-neutral-black-500)"
                }
              />
            )}
            {t(item.title)}
          </span>
        );
      })}
    </>
  );
};
export default Tab;
