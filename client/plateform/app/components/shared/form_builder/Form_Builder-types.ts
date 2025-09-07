import type { Control, FieldErrors } from "react-hook-form";

export type FormType =
  | "input"
  | "otp"
  | "phone"
  | "password"
  | "textarea"
  | "rate"
  | "media";

type OptionListType = {
  name: string;
  value?: string;
  id?: number;
};
export type FormListItemType = {
  id: string;
  formType: FormType;
  type?: string;
  fieldName: string;
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  containerClassName?: string;
  errorClassName?: string;
  optionList?: OptionListType[];
  value?: string | undefined;
  name?: string;
  variant?: "file" | "profile";
  validTypes?: string[];
  inputMode?:
    | "search"
    | "text"
    | "email"
    | "decimal"
    | "numeric"
    | "tel"
    | "url";
  placeholder?: string;
  validator?: object;
  info?: string;
  disabled?: boolean;
  autFocus?: boolean;
  loading?: boolean;
  errorFill?: string;
  inlineError?: boolean;
  isMultiple?: boolean;
  isEdit?: boolean;
  fillColor?: string;
  title?: string;
  limit?: number;
  setListDeleteImages?: (list: string[] | number[]) => void;
  showForgetPassword?: boolean;
  action?: (e: React.ChangeEvent<HTMLElement>) => void;
  onInput?: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: any
  ) => void;
};
type FormValues = {
  [key: string]: any;
};
export type FormBuiderProps = {
  formList: FormListItemType[] | [];
  control: Control<any>;
  errors: FieldErrors<FormValues>;
  loading?: boolean;
  setError?: (name?: string, error?: any) => void;
};
