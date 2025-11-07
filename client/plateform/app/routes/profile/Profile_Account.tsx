import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { emailRegex, phonePattern } from "~/common/constant/validator";
import type { ProfileType } from "~/common/types/Type";
import { handleError } from "~/common/utils/handleError";
import Button from "~/components/shared/button/Button";
import Form_Builder from "~/components/shared/form_builder/Form_Builder";
import type { FormListItemType } from "~/components/shared/form_builder/Form_Builder-types";
import useGetData from "~/hooks/useGetData";
import { API } from "~/services/apiUrl";
import axiosInstance from "~/services/axiosInstance";

const Profile_Account = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  // ___________ useform _________
  const {
    control,
    setError,
    setValue,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: null,
      phone: null,
    },
    mode: "onChange",
  });
  const { data } = useGetData<ProfileType>({
    endpoint: API.profile.profile,
    queryDefault: {},
    setValue: (data) => {
      Object.entries(data).forEach(([key, value]) => {
        setValue(key, value);
      });
    },
  });
  // _______________ list ______________
  const formList: FormListItemType[] = [
    {
      id: "avatar",
      formType: "media",
      fieldName: "avatar",
      variant: "profile",
      validTypes: ["image/jpeg", "image/png", "image/jpg"],
      isMultiple: false,
      name: data.fullName,
    },
    {
      id: "1",
      formType: "input",
      type: "text",
      name: "fullName",
      label: "name",
      fieldName: "fullName",
      validator: {
        required: "name_is_required",
        maxLength: {
          value: 30,
          message: t("max_length_error", { number: 30 }),
        },
      },
    },
    {
      id: "2",
      formType: "input",
      type: "email",
      name: "email",
      label: "email",
      fieldName: "email",
      inputMode: "email",
      validator: {
        required: "email_is_required",
        pattern: {
          value: emailRegex,
          message: "email_pattern_error",
        },
        maxLength: {
          value: 80,
          message: t("max_length_error", { number: 80 }),
        },
      },
    },
    {
      id: "3",
      formType: "phone",
      type: "number",
      name: "phone",
      label: "phone",
      fieldName: "phone",
      inputMode: "tel",
      validator: {
        required: "phone_is_required",
        pattern: {
          value: phonePattern,
          message: "phone_pattern_error",
        },
        maxLength: {
          value: 30,
          message: t("max_length_error", { number: 30 }),
        },
      },
    },
  ];
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await axiosInstance.patch(API.profile.profile, formData);
      if (response.status === 200) {
        toast.success(t("successfully_update_profile"));
      }
    } catch (err) {
      handleError(err, t, setError);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-[320px] flex flex-col gap-10 ">
      <h2 className="h5 font-semibold text-neutral-black-900">
        {t("account_details")}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
        <fieldset className="flex flex-col gap-4">
          <Form_Builder formList={formList} control={control} errors={errors} />
        </fieldset>
        <Button
          loading={loading}
          disabled={loading}
          text="save_changes"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Profile_Account;
