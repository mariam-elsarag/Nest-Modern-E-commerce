import React from "react";
import { Editor } from "primereact/editor";
import type { FormListItemType } from "./Form_Builder-types";

const textColors = ["#0e1422", "#5c5f6a"];
const fontSizes = [
  { label: "Normal", value: "16px" },
  { label: "Large", value: "18px" },
];

const toolbarOptions = (
  <span className="ql-formats">
    <button className="ql-bold" />
    <button className="ql-italic" />
    <button className="ql-underline" />{" "}
    <select className="ql-color">
      {textColors.map((color) => (
        <option key={color} value={color}></option>
      ))}
    </select>
    <select className="ql-size">
      {fontSizes.map((size) => (
        <option key={size.value} value={size.value}>
          {size.label}
        </option>
      ))}
    </select>
    <button className="ql-list" value="bullet" />
  </span>
);
type InputEditorProps = {
  error?: any;
  handleChange?: (e: any) => void;
  value?: any;
  item: FormListItemType;
  disabled?: boolean;
};
const Input_Editor = ({
  value,
  disabled,
  handleChange,
  item,
  error,
}: InputEditorProps) => {
  return (
    <div
      className={`w-full overflow-hidden h-full editor ${item?.className} ${
        error ? "error" : ""
      } `}
    >
      <Editor
        value={value}
        onTextChange={handleChange}
        readOnly={disabled}
        headerTemplate={toolbarOptions}
        formats={["bold", "italic", "underline", "color", "size", "list"]}

        // className="h-full"
      />
    </div>
  );
};

export default Input_Editor;
