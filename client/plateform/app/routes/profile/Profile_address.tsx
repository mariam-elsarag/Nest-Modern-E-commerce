import React, { useState } from "react";
import Checkout_Form from "../checkout/components/Checkout_Form";
import { useForm } from "react-hook-form";
import Button from "~/components/shared/button/Button";
import { handleError } from "~/common/utils/handleError";
import { useTranslation } from "react-i18next";

const Profile_address = () => {
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
