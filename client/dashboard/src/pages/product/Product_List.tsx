import React, { useState } from "react";
import Page_Wraper from "../../components/layout/page_wraper/Page_Wraper";
import { useNavigate } from "react-router-dom";
import Table_Layout from "../../components/shared/table/Table_Layout";
import type { ProductType } from "../../common/types/Type";
import { API } from "../../services/apiUrl";
import { currentLanguageCode } from "../../common/utils/switchLang";
import Product_Item from "../../components/shared/product/Product_Item";
import { formatPrice } from "../../common/utils/formatPrice";
import { productAvaliblityBadge } from "../../common/lists/Badges_List";
import Badge from "../../components/shared/badge/Badge";
import type { MenuListTypes } from "../../components/shared/menu/Menue.types";
import { EditIcon, TrashIcon } from "../../assets/icons/Icon";
import Menu from "../../components/shared/menu/Menu";
import Confirmation_Modal from "../../components/shared/modal/Confirmation_Modal";
import { handleError } from "../../common/utils/handleError";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Button from "../../components/shared/button/Button";

const Product_List = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState<number | null>();
  const [refetch, setRefetch] = useState();
  const [value, setValue] = useState();

  // ___________________ list _________________

  const list: MenuListTypes[] = [
    {
      icon: <EditIcon width="20" height="20" />,
      name: "update",
      action: (item) => {
        navigate(`/products/${item?.id}/edit`);
      },
    },
    {
      icon: <TrashIcon />,
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
      header: "name",
      field: "name",
      body: (item) => (
        <Product_Item
          avatar={item?.cover}
          title={currentLanguageCode === "en" ? item?.title : item?.title_ar}
          isDeleted={item?.isDeleted}
        />
      ),
    },
    {
      header: "sku",
      field: "sku",
      body: (item) => (
        <span className={item?.isDeleted ? "deleted_row" : ""}>
          {item?.sku ?? "-"}
        </span>
      ),
    },
    {
      header: "price",
      field: "price",
      body: (item) => (
        <span className={item?.isDeleted ? "deleted_row" : ""}>
          {item?.price ? formatPrice(item?.price) : 0}
        </span>
      ),
    },
    {
      header: "avaliblity",
      field: "isAvalible",
      body: (item) => {
        const { text, type } = productAvaliblityBadge(item?.isAvalible);
        return (
          <div className={item?.isDeleted ? "deleted_row" : ""}>
            <Badge text={text} type={type} />;
          </div>
        );
      },
    },

    {
      header: "categories",
      field: "categories",
      body: (item) => (
        <div className={item?.isDeleted ? "deleted_row" : ""}>
          {item?.categories?.length > 3 ? (
            <div>
              {item?.categores
                ?.slice(0, 3)
                ?.map(({ title, title_ar }) =>
                  currentLanguageCode === "en" ? title : title_ar
                )
                ?.join(", ")}
              <span> +{item?.categories?.length - 3}</span>
            </div>
          ) : (
            item?.categories
              ?.map(({ title, title_ar }) =>
                currentLanguageCode === "en" ? title : title_ar
              )
              ?.join(", ")
          )}
        </div>
      ),
    },
    {
      header: "action",
      field: "action",
      body: (item) => (
        <div>
          {item?.isDeleted ? (
            <Button
              handleClick={() => restore(item?.id)}
              variant="outline"
              size="sm"
              text="restore"
              round="lg"
            />
          ) : (
            <Menu<ProductType> list={list} data={item} />
          )}
        </div>
      ),
    },
  ];

  const deleteProduct = async () => {
    try {
      setDeleteLoader(true);
      const respone = await axiosInstance.delete(`${API.product.main}/${id}`);
      if (respone.status === 204) {
        toast.success(t("success_delete_product"));
        setDeleteModal(false);
        setId(null);
        value?.((prev) =>
          prev.map((item) =>
            item?.id === id ? { ...item, isDeleted: true } : item
          )
        );
      }
    } catch (err) {
      handleError(err, t);
    } finally {
      setDeleteLoader(false);
    }
  };
  const restore = async (itemId) => {
    try {
      const response = await axiosInstance.patch(
        `${API.product.main}/${itemId}/restore`
      );
      if (response.status === 200) {
        value?.((prev) =>
          prev.map((item) =>
            item?.id === itemId ? { ...item, isDeleted: false } : item
          )
        );
      }
    } catch (err) {
      handleError(err, t);
    }
  };
  return (
    <>
      <Page_Wraper
        label="products"
        hasBtn={true}
        btnName="add_product"
        btnCta={() => {
          navigate("/products/create");
        }}
      >
        <Table_Layout<ProductType>
          hasPagination={true}
          columns={columns}
          emptyText="no_product_yet"
          endpoint={API.product.main}
          search_placeholder="search_product"
          refetch={refetch}
          setValue={setValue}
        />
      </Page_Wraper>

      <Confirmation_Modal
        open={deleteModal}
        onClose={() => {
          setDeleteModal(false);
        }}
        title="confirm_delete_product"
        mainBtnText="delete_product"
        mainBtnCta={deleteProduct}
        loading={deleteLoader}
      />
    </>
  );
};

export default Product_List;
