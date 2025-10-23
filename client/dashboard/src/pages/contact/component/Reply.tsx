import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { FormListItemType } from "../../../components/shared/form_builder/Form_Builder-types";
import Form_Builder from "../../../components/shared/form_builder/Form_Builder";
import Button from "../../../components/shared/button/Button";
import { handleError } from "../../../common/utils/handleError";
import axiosInstance from "../../../services/axiosInstance";
import { API } from "../../../services/apiUrl";
import { toast } from "react-toastify";
import type { SupportType } from "../../../common/constant/types";

type ReplyProps = {
  id: number;
  onClose: () => void;
  value: SupportType[];
};
const Reply = ({ id, onClose, value }: ReplyProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  // ___________ useform _________
  const {
    control,
    setError,
    reset,
    setValue,
    formState: { errors, isValid, dirtyFields },
    handleSubmit,
  } = useForm({
    defaultValues: {
      reply: "",
    },
    mode: "onChange",
  });

  const formList: FormListItemType[] = [
    {
      id: "1",
      formType: "textarea",
      label: "reply",
      fieldName: "reply",
      placeholder: "reply",
      validator: {
        required: "required_field",
      },
    },
  ];
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `${API.contact.main}/${id}/reply`,
        data
      );
      if (response.status === 200) {
        toast.success(t("successfully_reply"));
        onClose();
        value?.((prev) =>
          prev.map((item) => (item?.id === id ? response.data.data : item))
        );
      }
    } catch (err) {
      handleError(err, t, setError);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <fieldset>
        <Form_Builder
          formList={formList}
          control={control}
          errors={errors}
          loading={loading}
        />
      </fieldset>
      <Button text="reply" hasFullWidth type="submit" loading={loading} />
    </form>
  );
};

export default Reply;
