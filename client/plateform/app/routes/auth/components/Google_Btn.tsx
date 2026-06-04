import React from "react";
import { useTranslation } from "react-i18next";
import { redirect } from "react-router";
import { GoogleIcon } from "~/assets/icons/Icon";
import Button from "~/components/shared/button/Button";
import { API, apiKey } from "~/services/apiUrl";

const Google_Btn = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-8">
      <Button
        variant="outline"
        text="continue_with_google"
        icon={<GoogleIcon />}
        iconDirection="left"
        hasFullWidth
        handleClick={() => {
          console.log("click");
          window.location.href = `${apiKey}${API.auth.google}`;
        }}
      />
      <div className="flex items-center gap-4">
        <span className="flex-1 flex items-center justify-center bg-neutral-black-100 h-[1px]" />
        <span className="label text-neutral-black-500 font-medium">
          {t("or")}
        </span>
        <span className="flex-1 flex items-center justify-center bg-neutral-black-100 h-[1px]" />
      </div>
    </div>
  );
};

export default Google_Btn;
