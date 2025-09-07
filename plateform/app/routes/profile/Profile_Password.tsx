import React from "react";
import { useTranslation } from "react-i18next";
import Password_Form from "~/components/shared/password_form/Password_Form";

const Profile_Password = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-[320px] flex flex-col gap-10 ">
      <h2 className="h5 font-semibold text-neutral-black-900">
        {t("change_password")}
      </h2>
      <Password_Form isRest={false} />
    </div>
  );
};

export default Profile_Password;
