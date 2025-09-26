import React from "react";
type viewColorProps = {
  color: string;
  text?: string;
};
const View_Colors = ({ color, text }: viewColorProps) => {
  return (
    <section className="flex items-center gap-2">
      <div className="flex items-center gap-2 w-5 h-5 rounded-full">
        <div
          style={{ background: color }}
          className="w-full h-full rounded-full"
        />
      </div>
      {text && <h4 className="text-neutral-black-900 body">{text}</h4>}
    </section>
  );
};

export default View_Colors;
