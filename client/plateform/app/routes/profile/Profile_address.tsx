import React, { useState } from "react";
import Checkout_Form from "../checkout/components/Checkout_Form";
import { useForm } from "react-hook-form";
import Button from "~/components/shared/button/Button";
import { handleError } from "~/common/utils/handleError";
import { useTranslation } from "react-i18next";
import useGetData from "~/hooks/useGetData";
import type { ProfileType } from "~/common/types/Type";
import { API } from "~/services/apiUrl";
import axiosInstance from "~/services/axiosInstance";
import { toast } from "react-toastify";

const Profile_address = () => {
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
  const { data } = useGetData<ProfileType>({
    endpoint: API.profile.profile,
    queryDefault: {},
    setValue: (data) => {
      Object.entries(data.address).forEach(([key, value]) => {
        setValue(key, value);
      });
    },
  });
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.patch(
        `${API.profile.profile}/address`,
        data
      );
      if (response.status === 200) {
        toast.success(t("successfully_update_address"));
      }
    } catch (err) {
      handleError(err, t, setError);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      className="max-w-[534px] flex flex-col gap-10 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <Checkout_Form errors={errors} control={control} isProfile={true} />
      <Button
        loading={loading}
        disabled={loading}
        text="save_changes"
        type="submit"
      />
    </form>
  );
};

export default Profile_address;
