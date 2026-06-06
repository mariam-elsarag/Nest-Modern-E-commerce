import { useTranslations } from "next-intl";
import React from "react";
import Button from "./Button";
import { GoogleIcon } from "@/app/_assets/icons/Icon";
import { signInWithGoogle } from "@/app/_lib/actions/auth";

const Google_Btn = () => {
  const t = useTranslations();
  return (
    <form action={signInWithGoogle} className="flex flex-col gap-8">
      <Button
        variant="outline"
        text="continue_with_google"
        icon={<GoogleIcon />}
        iconDirection="left"
        hasFullWidth
        type="submit"
      />
      <div className="flex items-center gap-4">
        <span className="flex-1 flex items-center justify-center bg-neutral-black-100 h-[1px]" />
        <span className="label text-neutral-black-500 font-medium">
          {t("or")}
        </span>
        <span className="flex-1 flex items-center justify-center bg-neutral-black-100 h-[1px]" />
      </div>
    </form>
  );
};

export default Google_Btn;
