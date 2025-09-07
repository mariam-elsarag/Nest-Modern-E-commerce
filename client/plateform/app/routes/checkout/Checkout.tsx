import React, { useState } from "react";
import type { Route } from "../+types/Public_Route";
import { useTranslation } from "react-i18next";
import type { breadCrumbListType } from "~/components/shared/header/page_header/Page_Header.types";
import { Link } from "react-router";
import Page_Header from "~/components/shared/header/page_header/Page_Header";
import Checkout_Form from "./components/Checkout_Form";
import Checkout_Order_Info from "./components/Checkout_Order_Info";
import { useForm } from "react-hook-form";
import { handleError } from "~/common/utils/handleError";
export async function clientLoader({ params }: Route.LoaderArgs) {
  const { id } = params;

  return { id };
}

const Checkout = ({ loaderData }: Route.ComponentProps) => {
  const { id } = loaderData;
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  // ___________ useform _________
  const {
    control,
    setError,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      email: "",
      fullName: "",
    },
    mode: "onChange",
  });
  const breadcrumbsList: breadCrumbListType[] = [
    {
      label: t("home"),
      template: () => <Link to={`/`}>{t("home")}</Link>,
    },
    {
      label: t("checkout"),
    },
  ];

  const onSubmit = async (data) => {
    try {
      setLoading(true);
    } catch (err) {
      handleError(err, t, setError);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="flex flex-col gap-10">
      <Page_Header
        title="checkout"
        breadcrumbsList={breadcrumbsList}
        variant="secondary"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container grid sm:grid-cols-2 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_436px] gap-6 lg:gap-10 xl:gap-20"
      >
        <Checkout_Form control={control} errors={errors} isProfile={false} />
        <Checkout_Order_Info />
      </form>
    </section>
  );
};

export default Checkout;
