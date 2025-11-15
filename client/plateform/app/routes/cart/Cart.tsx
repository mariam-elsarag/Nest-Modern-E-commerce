import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import Page_Header from "~/components/shared/header/page_header/Page_Header";
import type { breadCrumbListType } from "~/components/shared/header/page_header/Page_Header.types";
import Order_Summary from "./component/Order_Summary";
import Order_Info from "./component/Order_Info";
import type { CartItemType, CartType } from "~/common/types/Type";
import { API } from "~/services/apiUrl";
import type { Route } from "./+types/Cart";
import axiosInstance from "~/services/axiosInstance";
import Empty from "~/components/shared/empty/Empty";
import useGetData from "~/hooks/useGetData";
import { handleError } from "~/common/utils/handleError";
import { useAuth } from "~/context/Auth_Context";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { currentLanguageCode } from "~/common/utils/switchLang";
const Cart = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
  const cartToken = Cookies.get("cartToken");

  const {
    data: cart,
    setRefetch,
    setData,
  } = useGetData<CartType>({
    endpoint: API.cart,
  });
  const breadcrumbsList: breadCrumbListType[] = [
    {
      label: t("home"),
      template: () => <Link to={`/`}>{t("home")}</Link>,
    },
    {
      label: t("cart"),
    },
  ];

  const validateCheckout = async () => {
    try {
      setLoadingBtn(true);
      const response = await axiosInstance.post(
        `${API.cart}/validate`,
        {},
        {
          params: { carToken: token ? null : cartToken },
        }
      );

      if (response.status === 200) {
        navigate("/checkout");
      }
    } catch (err) {
      const cartValidation = err.response?.data?.error?.variants || [];
      const invalidIds: number[] = [];

      cartValidation.forEach((errItem) => {
        switch (errItem.type) {
          case "quantity_not_available":
            toast.error(
              `${currentLanguageCode === "en" ? errItem.productTitle : errItem.productTitleAr}: only ${errItem.available} items available`
            );
            break;
          case "product_unavailable":
          case "variant_deleted":
            invalidIds.push(errItem.variantId);
            break;
        }
      });

      if (invalidIds.length > 0) {
        toast.error("invalid_cart");
        setData((prev) => ({
          ...prev,
          items: prev.items.map((item) =>
            invalidIds.includes(item.variantId)
              ? { ...item, isValid: false }
              : item
          ),
        }));
      }
    } finally {
      setLoadingBtn(false);
    }
  };
  return (
    <section className="flex flex-col gap-10">
      <Page_Header
        title="cart"
        breadcrumbsList={breadcrumbsList}
        variant="secondary"
      />
      {cart?.items?.length > 0 ? (
        <section className="container grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_341px] gap-6 lg:gap-10 xl:gap-20">
          <Order_Info data={cart} setRefetch={setRefetch} />
          <Order_Summary
            data={cart}
            handleClick={validateCheckout}
            loadingBtn={loadingBtn}
          />
        </section>
      ) : (
        <section>
          <Empty
            des="empty_cart_description"
            title="empty_cart_title"
            btnName="empty_cart_button"
            btnCta={() => {
              navigate("/product");
            }}
          />
        </section>
      )}
    </section>
  );
};

export default Cart;
