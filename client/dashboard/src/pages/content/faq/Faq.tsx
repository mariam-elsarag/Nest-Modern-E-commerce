import React, { useState } from "react";
import { currentLanguageCode } from "../../../common/utils/switchLang";
import Read_More from "../../../components/shared/read_more/Read_More";
import { API } from "../../../services/apiUrl";
import Table_Layout from "../../../components/shared/table/Table_Layout";
import type { FaqType } from "../../../common/types/Type";
import Button from "../../../components/shared/button/Button";
import { useTranslation } from "react-i18next";
import { EditIcon, TrashIcon } from "../../../assets/icons/Icon";
import { useNavigate } from "react-router-dom";
import Confirmation_Modal from "../../../components/shared/modal/Confirmation_Modal";
import axiosInstance from "../../../services/axiosInstance";
import { toast } from "react-toastify";
import { handleError } from "../../../common/utils/handleError";
import Menu from "../../../components/shared/menu/Menu";
import type { MenuListTypes } from "../../../components/shared/menu/Menue.types";

const Faq = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState<number | null>();
  const [refetch, setRefetch] = useState();

  const list: MenuListTypes<FaqType>[] = [
    {
      icon: <EditIcon width="20" height="20" />,
      name: "update",
      action: (item) => {
        navigate(`/website/faq/${item?.id}/edit`);
      },
    },
    {
      icon: <TrashIcon width="20" height="20" />,
      name: "delete",
      textClassName: "text-semantic-red-900",
      action: (item) => {
        setId(item?.id);
        setDeleteModal(true);
      },
    },
  ];
  const columns = [
    {
      header: "answer",
      field: "answer",
      body: (item) =>
        currentLanguageCode === "en"
          ? item?.answer ?? "-"
          : item?.answer_ar ?? "-",
    },
    {
      header: "question",
      field: "question",
      body: (item) => (
        <Read_More
          text={
            currentLanguageCode === "en" ? item?.question : item?.question_ar
          }
        />
      ),
    },
    {
      header: "action",
      field: "action",
      body: (item) => <Menu<FaqType> list={list} data={item} />,
    },
  ];
  const deleteFaq = async () => {
    try {
      setDeleteLoader(true);
      const respone = await axiosInstance.delete(`${API.website.faq}/${id}`);
      if (respone.status === 204) {
        toast.success(t("successfully_delete_faq"));
        setDeleteModal(false);
        setId(null);
        setRefetch(Date.now());
      }
    } catch (err) {
      handleError(err, t);
    } finally {
      setDeleteLoader(false);
    }
  };
  return (
    <>
      <Table_Layout<FaqType>
        hasPagination={true}
        columns={columns}
        emptyText="no_faq_yet"
        endpoint={API.website.faq}
        title="faq"
        refetch={refetch}
      >
        <Button text="add_faq" to="/website/faq/create" />
      </Table_Layout>
      <Confirmation_Modal
        open={deleteModal}
        onClose={() => {
          setDeleteModal(false);
        }}
        title="confirm_delete_faq"
        mainBtnText="delete_faq"
        mainBtnCta={deleteFaq}
        loading={deleteLoader}
      />
    </>
  );
};

export default Faq;
