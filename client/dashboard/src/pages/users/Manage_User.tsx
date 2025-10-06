import React, { useEffect, useState } from "react";
import Page_Wraper from "../../components/layout/page_wraper/Page_Wraper";
import type { BreadCrumbListType } from "../../components/layout/header/page_header/Page_Header.types";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import Page_Title from "../../components/layout/header/page_title/Page_Title";
import { useForm } from "react-hook-form";
import type { FormListItemType } from "../../components/shared/form_builder/Form_Builder-types";
import { emailRegex, phonePattern } from "../../common/constant/validator";
import { handleError } from "../../common/utils/handleError";
import Form_Builder from "../../components/shared/form_builder/Form_Builder";
import Button from "../../components/shared/button/Button";
import axiosInstance from "../../services/axiosInstance";
import { API } from "../../services/apiUrl";
import { toast } from "react-toastify";
import { accountStatusList, userRole } from "../../common/lists/List";

const Manage_User = () => {
  const { t } = useTranslation();

  const { id } = useParams();
  const isEdit = location.pathname.includes("/edit") && id;
  const pageTitle = isEdit ? "update_admin" : "add_admin";
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
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
      fullName: "",
      email: "",
      phone: null,
    },
    mode: "onChange",
  });
  const breadcrumbsList: BreadCrumbListType[] = [
    {
      label: t("users"),
      template: () => <Link to={`/users`}>{t("users")}</Link>,
    },
    {
      label: t(pageTitle),
    },
  ];
  // _______________ list ______________
  const formList: FormListItemType[] = [
    {
      id: "1",
      formType: "input",
      type: "text",
      name: "fullName",
      label: "fullName",
      placeholder: "fullName",
      fieldName: "fullName",
      validator: {
        required: "required_field",
        maxLength: {
          value: 30,
          message: t("max_length_error", { number: 30 }),
        },
      },
    },
    {
      id: "2",
      formType: "input",
      type: "text",
      name: "email",
      label: "email",
      placeholder: "example@gmail.com",
      fieldName: "email",
      inputMode: "email",
      validator: {
        required: "required_field",
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
        required: "required_field",
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
    isEdit && {
      id: "4",
      formType: "dropdown",
      label: "role",
      fieldName: "role",
      placeholder: "role",
      optionList: userRole?.map((item) => ({
        name: item?.name,
        value: item?.value,
      })),
    },
    isEdit && {
      id: "5",
      formType: "dropdown",
      label: "status",
      fieldName: "status",
      placeholder: "status",
      optionList: accountStatusList?.map((item) => ({
        name: item?.name,
        value: item?.value,
      })),
    },
  ]?.filter(Boolean) as FormListItemType[];

  // _________________function __________-
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const method = isEdit ? "patch" : "post";
      const endpoint = isEdit ? `${API.users.list}/${id}` : API.users.list;
      let sendData;
      if (isEdit) {
        sendData = Object.keys(dirtyFields).reduce((acc, key) => {
          if (key) {
            acc[key] = data[key];
          }
          return acc;
        }, {});
      } else {
        sendData = { ...data };
      }
      const response = await axiosInstance[method](endpoint, sendData);
      if (response.status === 201) {
        toast.success(t("successfully_invite_admin"));
        reset();
        navigate("/users");
      } else {
        toast.success(t("successfully_update_user_data"));
      }
    } catch (err) {
      handleError(err, t, setError);
    } finally {
      setLoading(false);
    }
  };
  const getDetails = async () => {
    try {
      setLoadingData(true);
      const response = await axiosInstance.get(`${API.users.list}/${id}`);
      if (response.status === 200) {
        Object.entries(response.data).forEach(([key, value]) => {
          setValue(key, value);
        });
      }
    } catch (err) {
      handleError(err, t, setError);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isEdit) {
      getDetails();
    }
  }, [isEdit]);
  return (
    <Page_Wraper
      list={breadcrumbsList}
      containerClassName="layer shadow_sm min-dh-[85dvh] py-6"
    >
      <Page_Title title={pageTitle} />
      <form
        className="flex flex-col gap-10 px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset className="grid grid-cols-2 gap-6">
          <Form_Builder
            formList={formList}
            control={control}
            errors={errors}
            loading={loadingData || loading}
          />
        </fieldset>
        <Button
          loading={loading}
          disabled={loading}
          text={isEdit ? "save" : "invite"}
          type="submit"
          hasFullWidth
        />
      </form>
    </Page_Wraper>
  );
};

export default Manage_User;
