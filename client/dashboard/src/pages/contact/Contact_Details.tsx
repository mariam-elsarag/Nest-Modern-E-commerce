import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import { API } from "../../services/apiUrl";
import type { BreadCrumbListType } from "../../components/breadCrumb/Bread_Crumb.types";
import Page_Wraper from "../../components/layout/page_wraper/Page_Wraper";
import Page_Title from "../../components/layout/header/page_title/Page_Title";
import Button from "../../components/shared/button/Button";
import type { FormListItemType } from "../../components/shared/form_builder/Form_Builder-types";
import { supportTicketList } from "../../common/lists/List";
import Form_Builder from "../../components/shared/form_builder/Form_Builder";
import { useForm } from "react-hook-form";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "react-toastify";
import { handleError } from "../../common/utils/handleError";
import type { ListType } from "../../components/shared/list/List.types";
import List from "../../components/shared/list/List";
import Empty from "../../components/shared/empty/Empty";

const Contact_Details = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const {
    control,
    setError,
    reset,
    setValue,
    formState: { errors, isValid, isDirty },
    handleSubmit,
  } = useForm({
    defaultValues: {
      status: null,
    },
    mode: "onChange",
  });
  const { data, error } = useGetData(`${API.contact.main}/${id}`, setValue);

  const breadcrumbsList: BreadCrumbListType[] = [
    {
      label: t("contact"),
      template: () => <Link to={`/contact`}>{t("contact")}</Link>,
    },
    {
      label: t("contact_details"),
    },
  ];

  const formList: FormListItemType[] = [
    {
      id: "1",
      formType: "dropdown",
      fieldName: "status",
      placeholder: "status",
      optionList: supportTicketList.map((item) => ({
        name: t(item?.name),
        value: item?.value,
      })),
      validator: {
        required: "required_field",
      },
    },
  ];
  const list: ListType[] = [
    {
      id: 1,
      title: "fullName",
      value: data?.fullName,
    },
    {
      id: 2,
      title: "email",
      value: data?.email,
    },
    {
      id: 3,
      title: "subject",
      value: data?.subject ?? "-",
    },
    {
      id: 4,
      title: "message",
      value: data?.message ?? "-",
    },
    {
      id: 5,
      title: "latest_admin_reply",
      value: data?.adminReply ?? "-",
    },
  ];
  const onSubmit = async (data) => {
    if (isDirty) {
      try {
        setLoading(true);
        const response = await axiosInstance.patch(
          `${API.contact.main}/${id}`,
          data
        );
        if (response.status === 200) {
          toast.success(t("successfully_update_status"));
        }
      } catch (err) {
        handleError(err, t, setError);
      } finally {
        setLoading(false);
      }
    }
  };
  if (error) {
    return (
      <Page_Wraper
        list={breadcrumbsList}
        containerClassName="layer shadow_sm min-h-[85dvh] py-6"
      >
        <Page_Title title="contact_details" />
        <div className="flex-1 h-full flex items-center justify-center">
          <Empty des="support_ticket_not_found" />
        </div>
      </Page_Wraper>
    );
  }
  return (
    <Page_Wraper
      list={breadcrumbsList}
      containerClassName="layer shadow_sm min-h-[85dvh] py-6"
    >
      <Page_Title title="contact_details">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center gap-4"
        >
          <Form_Builder
            formList={formList}
            control={control}
            errors={errors}
            loading={loading}
          />
          <Button text="save" size="sm" type="submit" loading={loading} />
        </form>
      </Page_Title>
      <div className="px-4">
        <List list={list} />
      </div>
    </Page_Wraper>
  );
};

export default Contact_Details;
