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
import axiosInstance from "../../services/axiosInstance";
import { toast } from "react-toastify";

const Privacy_And_Terms = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const isTerms = location.pathname.includes("/terms-and-conditions");
  const pageTitle = isTerms ? "terms_and_conditions" : "privacy_policy";

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
      content: "",
      content_ar: "",
    },
    mode: "onChange",
  });
  // ___________ hooks _________
  const { data, loading: loadingData } = useGetData(
    isTerms ? API.website.terms : API.website.privacy,
    setValue
  );
  // ______________ list _____________
  const formList: FormListItemType[] = [
    {
      id: "1",
      formType: "editor",
      label: "description",
      fieldName: "content",
      placeholder: "description",
      validator: {
        required: "required_field",
      },
    },
    {
      id: "2",
      formType: "editor",
      label: "description_ar",
      fieldName: "content_ar",
      placeholder: "description_ar",
      validator: {
        required: "required_field",
      },
    },
  ];
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const endpoint = isTerms ? API.website.terms : API.website.privacy;
      const response = await axiosInstance.put(endpoint, data);
      const message = isTerms
        ? "successfully_update_terms"
        : "successfully_update_privacy";
      if (response.status === 200) {
        toast.success(t(message));
      }
    } catch (err) {
      handleError(err, t, setError);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="layer shadow_sm  min-h-[60vh] p-4 grid gap-6">
      <Page_Title title={pageTitle} />
      <form className="flex flex-col gap-10 " onSubmit={handleSubmit(onSubmit)}>
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
    </div>
  );
};

export default Privacy_And_Terms;
