import Input_Field from "@/app/_components/ui/form/Input_Field";
import Media_Field from "@/app/_components/ui/form/Media_Field";
import Otp_Field from "@/app/_components/ui/form/Otp_Field";
import Password_Field from "@/app/_components/ui/form/Password_Field";
import Phone_Field from "@/app/_components/ui/form/Phone_Field";
import Rate_Field from "@/app/_components/ui/form/Rate_Field";
import Textarea from "@/app/_components/ui/form/Textarea";

export const FORM_FIELDS_MAP = {
  input: Input_Field,
  password: Password_Field,
  otp: Otp_Field,
  phone: Phone_Field,
  textarea: Textarea,
  rate: Rate_Field,
  media: Media_Field,
};
