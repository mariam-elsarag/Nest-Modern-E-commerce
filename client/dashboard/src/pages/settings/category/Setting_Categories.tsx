import React, { useState } from "react";
import Table_Layout from "../../../components/shared/table/Table_Layout";
import { API } from "../../../services/apiUrl";
import type { CategoryType } from "../../../common/types/Type";
import Button from "../../../components/shared/button/Button";
import type { MenuListTypes } from "../../../components/shared/menu/Menue.types";
import { EditIcon, TrashIcon } from "../../../assets/icons/Icon";
import { useNavigate } from "react-router-dom";
import Menu from "../../../components/shared/menu/Menu";
import Confirmation_Modal from "../../../components/shared/modal/Confirmation_Modal";
import { handleError } from "../../../common/utils/handleError";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../../services/axiosInstance";
import { toast } from "react-toastify";

const Setting_Categories = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [confirmDeletePopup, setConfirmDeletePopup] = useState(false);
  const [deleteLoader, setDeleteLoading] = useState(false);
  const [id, setId] = useState();
  const [refetch, setRefetch] = useState();
  const list: MenuListTypes[] = [
    {
      icon: <EditIcon width="20" height="20" />,
      name: "update",
      action: (item: CategoryType) => {
        navigate(`/settings/categories/${item?.id}/edit`);
      },
    },
    {
      icon: (
        <TrashIcon
          fill="var(--color-semantic-red-900)"
          width="20"
          height="20"
        />
      ),
      name: "delete",
      textClassName: "text-semantic-red-900",
      action: (item: CategoryType) => {
        setId(item?.id);
        setConfirmDeletePopup(true);
      },
    },
  ] as const;

  const columns = [
    {
      header: "title",
      field: "title",
    },
    {
      header: "title_ar",
      field: "title_ar",
    },
    {
      header: "action",
      field: "action",
      body: (item) => <Menu<CategoryType> list={list} data={item} />,
    },
  ];

  //_________________ function _________________
  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      const response = await axiosInstance.delete(
        `${API.settting.category}/${id}`
      );
      if (response.status === 204) {
        toast.success(t("successfully_delete_category"));
        setRefetch(Date.now());
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
      {" "}
      <Table_Layout<CategoryType>
        hasPagination={true}
        columns={columns}
        emptyText="no_category_yet"
        endpoint={API.settting.category}
        title="category"
        refetch={refetch}
      >
        <Button text="add_category" to="/settings/categories/create" />
      </Table_Layout>
      <Confirmation_Modal
        open={confirmDeletePopup}
        onClose={() => setConfirmDeletePopup(false)}
        description="confirm_delete_category"
        mainBtnCta={handleDelete}
        loading={deleteLoader}
      />
    </>
  );
};

export default Setting_Categories;
