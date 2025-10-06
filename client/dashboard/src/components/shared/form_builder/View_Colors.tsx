import React from "react";
import Button from "../button/Button";
import {
  CheckBoxIcon,
  CheckedBoxIcon,
  CloseIcon,
} from "../../../assets/icons/Icon";
type viewColorProps = {
  color: string;
  id: number;
  text?: string;
  hasClose?: boolean;
  selected?: number[];
  setSelected?: React.Dispatch<React.SetStateAction<number[]>>;
};
const View_Colors = ({
  color,
  text,
  hasClose,
  selected,
  setSelected,
  id,
}: viewColorProps) => {
  return (
    <section
      className={`flex items-center gap-2 ${
        hasClose ? "border rounded-full border-neutral-black-100 px-2 py-1" : ""
      } ${selected?.includes(id) ? "bg-neutral-white-100/70" : ""} `}
    >
      <div className="flex border border-neutral-black-200 items-center gap-2 w-5 h-5 rounded-full">
        <div
          style={{ background: color }}
          className="w-full h-full rounded-full"
        />
      </div>
      {text && <h4 className="text-neutral-black-900 body">{text}</h4>}
      {hasClose && (
        <Button
          icon={selected?.includes(id) ? <CheckedBoxIcon /> : <CheckBoxIcon />}
          size="xs"
          round="full"
          variant="tertiery"
          className="!bg-transparent"
          hasHover={false}
          handleClick={() => {
            setSelected((prev) =>
              prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
            );
          }}
        />
      )}
    </section>
  );
};

export default View_Colors;
