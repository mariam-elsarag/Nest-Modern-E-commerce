import React, { useState } from "react";
import type { FormListItemType } from "../../components/shared/form_builder/Form_Builder-types";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Form_Builder from "../../components/shared/form_builder/Form_Builder";
import Button from "../../components/shared/button/Button";
import View_Colors from "../../components/shared/form_builder/View_Colors";
import Page_Wraper from "../../components/layout/page_wraper/Page_Wraper";
import Page_Title from "../../components/layout/header/page_title/Page_Title";
import Confirmation_Modal from "../../components/shared/modal/Confirmation_Modal";
import { handleError } from "../../common/utils/handleError";
import useGetData from "../../hooks/useGetData";
import { API } from "../../services/apiUrl";
import { currentLanguageCode } from "../../common/utils/switchLang";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "react-toastify";

const Setting_Colors = () => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [deleteLoader, setDeleteLoading] = useState(false);
  const [selected, setSelected] = useState([]);

  const [confirmDeletePopup, setConfirmDeletePopup] = useState(false);

  // ___________ hooks _________
  const { data, setData } = useGetData(API.settting.color);
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
      name: "",
      name_ar: "",
      color: "",
    },
    mode: "onChange",
  });
  const colorList: FormListItemType[] = [
    {
      id: "1",
      formType: "input",
      type: "text",
      inputMode: "text",
      name: "color_name",
      label: "color_name",
      placeholder: "color_name",
      fieldName: "name",
      validator: {
        required: "required_field",
        maxLength: {
          value: 100,
          message: t("max_length_error", { number: 100 }),
        },
      },
    },
    {
      id: "2",
      formType: "input",
      type: "text",
      inputMode: "text",
      name: "color_name_ar",
      label: "color_name_ar",
      placeholder: "color_name_ar",
      fieldName: "name_ar",
      validator: {
        required: "required_field",
        maxLength: {
          value: 100,
          message: t("max_length_error", { number: 100 }),
        },
      },
    },

    {
      id: "3",
      formType: "input",
      type: "color",
      name: "color",
      label: "color",
      placeholder: "color",
      fieldName: "color",
      inputClassName: "!w-7 !h-7 !rounded-[4px] !p-0 ",
      inputContainerClassName: "!w-7 !h-7  ",
      validator: {
        required: "required_field",
      },
    },
  ];
  //_________________ function _____________
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(API.settting.color, data);
      if (response.status === 201) {
        setData((pre) => [...pre, response.data]);
        toast.success(t("successfully_create_color"));
        reset();
      }
    } catch (err) {
      handleError(err, t, setError);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteColors = async () => {
    try {
      setDeleteLoading(true);
      const response = await axiosInstance.delete(API.settting.color, {
        data: {
          ids: selected,
        },
      });
      if (response.status === 204) {
        setData((pre) => pre.filter((item) => !selected.includes(item?.id)));
        setSelected([]);
        toast.success(t("successfully_delete_colors"));
        setConfirmDeletePopup(false);
      }
    } catch (err) {
      handleError(err, t);
    } finally {
      setDeleteLoading(false);
    }
  };
  return (
    <>
      <Page_Wraper containerClassName="layer shadow_sm min-h-[75vh] py-6 ">
        <Page_Title title="colors" />
        <section className="grid gap-6  px-4">
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-10">
            <fieldset className="grid md:grid-cols-2  gap-6">
              <Form_Builder
                formList={colorList}
                control={control}
                errors={errors}
              />
            </fieldset>
            <Button text="add_color" hasFullWidth type="submit" />
          </form>
          <div className="layer p-4 grid gap-6 ">
            <div className="flex flex-wrap items-center gap-3">
              {data?.map((item) => (
                <View_Colors
                  hasClose={true}
                  color={item?.color}
                  key={item?.id}
                  text={
                    currentLanguageCode === "en" ? item?.name : item?.name_ar
                  }
                  id={item?.id}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
            </div>
            {selected?.length > 0 && (
              <Button
                text="delete_colors"
                variant="error"
                handleClick={() => setConfirmDeletePopup(true)}
              />
            )}
          </div>
        </section>
      </Page_Wraper>
      <Confirmation_Modal
        open={confirmDeletePopup}
        onClose={() => setConfirmDeletePopup(false)}
        description="confirm_delete_message"
        mainBtnCta={handleDeleteColors}
        loading={deleteLoader}
      />
    </>
  );
};

export default Setting_Colors;
