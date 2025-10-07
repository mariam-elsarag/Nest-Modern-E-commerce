import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { handleError } from "../../../common/utils/handleError";
import { API } from "../../../services/apiUrl";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";
import { toast } from "react-toastify";
import Page_Title from "../../../components/layout/header/page_title/Page_Title";
import Form_Builder from "../../../components/shared/form_builder/Form_Builder";
import Button from "../../../components/shared/button/Button";

const Category_Mangment = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const isEdit = location.pathname.includes("/edit");
  const pageTitle = isEdit ? "update_category" : "add_category";

  // ___________ useform _________
  const {
    control,
    setError,

    reset,
    setValue,
    clearErrors,
    formState: { errors, isValid, dirtyFields },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: "",
      title_ar: "",
    },
    mode: "onChange",
  });
  //_________________ list ________________________
  const formList: FormListItemType[] = [
    {
      id: "1",
      formType: "input",
      type: "text",
      name: "title",
      label: "title",
      placeholder: "title",
      fieldName: "title",
      validator: {
        required: "required_field",
        maxLength: {
          value: 50,
          message: t("max_length_error", { number: 50 }),
        },
      },
    },
    {
      id: "2",
      formType: "input",
      type: "text",
      name: "title_ar",
      label: "title_ar",
      placeholder: "title_ar",
      fieldName: "title_ar",
      validator: {
        required: "required_field",
        maxLength: {
          value: 50,
          message: t("max_length_error", { number: 50 }),
        },
      },
    },
  ];

  //_________________ function ____________________
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const method = isEdit ? "patch" : "post";
      const endpoint = isEdit
        ? `${API.settting.category}/${id}`
        : API.settting.category;

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
        toast.success(t("successfully_add_category"));
        reset();
        navigate("/settings/categories");
      } else {
        toast.success(t("successfully_update_category"));
        Object.entries(response.data).forEach(([key, value]) => {
          setValue(key, value);
        });
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
      const response = await axiosInstance.get(
        `${API.settting.category}/${id}`
      );
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

export default Category_Mangment;
