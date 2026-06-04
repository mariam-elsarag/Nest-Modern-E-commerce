"use client";
import React from "react";
import Button from "./Button";
import { LanguageIcon } from "../../../app/_assets/icons/Icon";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = locale === "en" ? "ar" : "en";
  return (
    <>
      <Button
        icon={<LanguageIcon width="20" height="20" />}
        variant="tertiery"
        size="sm"
        hasHover={false}
        handleClick={() => router.push(`/${switchLocale}${pathname.slice(3)}`)}
      />
    </>
  );
};

export default LanguageSwitcher;
