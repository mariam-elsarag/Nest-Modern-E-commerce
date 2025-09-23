import React, { useState } from "react";
import Page_Title from "../../components/layout/header/page_title/Page_Title";
import { useTranslation } from "react-i18next";
import { handleError } from "../../common/utils/handleError";
import { useForm } from "react-hook-form";
import type { FormListItemType } from "../../components/shared/form_builder/Form_Builder-types";
import Page_Wraper from "../../components/layout/page_wraper/Page_Wraper";
import Form_Builder from "../../components/shared/form_builder/Form_Builder";
import Button from "../../components/shared/button/Button";
import useGetData from "../../hooks/useGetData";
import { API } from "../../services/apiUrl";

const Privacy_And_Terms = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const isTerms = location.pathname.includes("/terms-and-conditions");
  const pageTitle = isTerms ? "terms_and_conditions" : "privacy_policy";

  // ___________ hooks _________
  const { data, loading: loadingData } = useGetData(
    isTerms ? API.website.terms : API.website.privacy
  );
  // ___________ useform _________
  const {
    control,
    setError,
    watch,
    reset,
    setValue,
    clearErrors,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      description: "",
      description_ar: "",
    },
    mode: "onChange",
  });

  // ______________ list _____________
  const formList: FormListItemType[] = [
    {
      id: "1",
      formType: "editor",
      label: "description",
      fieldName: "description",
      placeholder: "description",
      validator: {
        required: "required_field",
      },
    },
    {
      id: "2",
      formType: "editor",
      label: "description_ar",
      fieldName: "description_ar",
      placeholder: "description_ar",
      validator: {
        required: "required_field",
      },
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
    <Page_Wraper>
      <Page_Title title={pageTitle} />
      <form
        className="flex flex-col gap-10 px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {" "}
        <fieldset className="grid gap-6">
          <Form_Builder formList={formList} control={control} errors={errors} />
        </fieldset>
        <Button
          loading={loading}
          disabled={loading}
          text="save"
          type="submit"
          hasFullWidth
        />
      </form>
    </Page_Wraper>
  );
};

export default Privacy_And_Terms;
