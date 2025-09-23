import React, { useState } from "react";
import Page_Wraper from "../../../components/layout/page_wraper/Page_Wraper";
import Page_Title from "../../../components/layout/header/page_title/Page_Title";
import { useTranslation } from "react-i18next";
import { handleError } from "../../../common/utils/handleError";
import { useForm } from "react-hook-form";
import type { FormListItemType } from "../../../components/shared/form_builder/Form_Builder-types";
import Button from "../../../components/shared/button/Button";
import Form_Builder from "../../../components/shared/form_builder/Form_Builder";

const Faq = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const isEdit = location.pathname.includes("/edit");
  const pageTitle = isEdit ? "update_faq" : "add_faq";

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
      answer: "",
      answer_ar: "",
      question: "",
      question_ar: "",
    },
    mode: "onChange",
  });

  //_________________ list ________________________
  const formList: FormListItemType[] = [
    {
      id: "1",
      formType: "input",
      type: "text",
      name: "question",
      label: "question",
      placeholder: "question",
      fieldName: "question",
      validator: {
        required: "required_field",
        maxLength: {
          value: 80,
          message: t("max_length_error", { number: 80 }),
        },
      },
    },
    {
      id: "2",
      formType: "input",
      type: "text",
      name: "question_ar",
      label: "question_ar",
      placeholder: "question_ar",
      fieldName: "question_ar",
      validator: {
        required: "required_field",
        maxLength: {
          value: 80,
          message: t("max_length_error", { number: 80 }),
        },
      },
    },
    {
      id: "3",
      formType: "textarea",
      label: "answer",
      placeholder: "answer",
      fieldName: "answer",
      containerClassName: "col-span-1 lg:col-span-2",
      validator: {
        required: "required_field",
        maxLength: {
          value: 250,
          message: t("max_length_error", { number: 250 }),
        },
      },
    },
    {
      id: "4",
      formType: "textarea",
      label: "answer_ar",
      placeholder: "answer_ar",
      fieldName: "answer",
      containerClassName: "col-span-1 lg:col-span-2",
      validator: {
        required: "required_field",
        maxLength: {
          value: 250,
          message: t("max_length_error", { number: 250 }),
        },
      },
    },
  ];
  //_________________ function ____________________
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
    <div className="layer shadow_sm  min-h-[60vh] p-4 ">
      {" "}
      <Page_Title title={pageTitle} />
      <form
        className="flex flex-col gap-10 p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {" "}
        <fieldset className="grid md:grid-cols-2 gap-6">
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

export default Faq;
