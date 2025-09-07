import { useTranslation } from "react-i18next";
import Password_Form from "../../components/shared/password_form/Password_Form";

const Reset_Password = () => {
  const { t } = useTranslation();

  return <Password_Form />;
};

export default Reset_Password;
