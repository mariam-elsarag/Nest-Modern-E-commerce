import React from "react";
import Page_Wraper from "../../components/layout/page_wraper/Page_Wraper";
import { useNavigate } from "react-router-dom";
import Table_Layout from "../../components/shared/table/Table_Layout";
import type { ProductType } from "../../common/types/Type";
import { API } from "../../services/apiUrl";
import { currentLanguageCode } from "../../common/utils/switchLang";
import Product_Item from "../../components/shared/product/Product_Item";
import { formatPrice } from "../../common/utils/formatPrice";
import { productStatusBadge } from "../../common/lists/Badges_List";
import Badge from "../../components/shared/badge/Badge";

export const fakeProducts: ProductType[] = [
  {
    id: 1,
    image: "https://via.placeholder.com/80",
    title: "Blue T-Shirt",
    title_ar: "تيشيرت أزرق",
    sku: "TSH-BLU-M",
    price: 250,
    quantity: 15,
    status: "inStock",
    categories: [
      { id: 1, title: "Clothing", title_ar: "ملابس" },
      { id: 2, title: "Men", title_ar: "رجالي" },
      { id: 3, title: "T-Shirts", title_ar: "تيشيرتات" },
    ],
  },
  {
    id: 2,
    image: "https://via.placeholder.com/80",
    title: "Wireless Mouse",
    title_ar: "ماوس لاسلكي",
    sku: "MOU-WRL-001",
    price: 120,
    quantity: 0,
    status: "outOfStock",
    categories: [
      { id: 4, title: "Electronics", title_ar: "إلكترونيات" },
      { id: 5, title: "Accessories", title_ar: "إكسسوارات" },
    ],
  },
  {
    id: 3,
    image: "https://via.placeholder.com/80",
    title: "Running Shoes",
    title_ar: "حذاء رياضي",
    sku: "SHO-RUN-42",
    price: 600,
    quantity: 3,
    status: "lowStock",
    categories: [
      { id: 1, title: "Clothing", title_ar: "ملابس" },
      { id: 6, title: "Shoes", title_ar: "أحذية" },
      { id: 7, title: "Sports", title_ar: "رياضة" },
      { id: 8, title: "Men", title_ar: "رجالي" },
    ],
  },
  {
    id: 4,
    image: "https://via.placeholder.com/80",
    title: "Leather Wallet",
    title_ar: "محفظة جلد",
    sku: "WAL-LEA-001",
    price: 350,
    quantity: 25,
    status: "inStock",
    categories: [
      { id: 5, title: "Accessories", title_ar: "إكسسوارات" },
      { id: 9, title: "Leather", title_ar: "جلد" },
    ],
  },
  {
    id: 5,
    image: "https://via.placeholder.com/80",
    title: "Gaming Keyboard",
    title_ar: "كيبورد ألعاب",
    sku: "KEY-GAM-002",
    price: 750,
    quantity: 7,
    status: "inStock",
    categories: [
      { id: 4, title: "Electronics", title_ar: "إلكترونيات" },
      { id: 10, title: "Gaming", title_ar: "ألعاب" },
      { id: 11, title: "Keyboards", title_ar: "لوحات مفاتيح" },
    ],
  },
];

const Product_List = () => {
  const navigate = useNavigate();
  const columns = [
    {
      header: "name",
      field: "name",
      body: (item) => (
        <Product_Item
          avatar={item?.image}
          title={currentLanguageCode === "en" ? item?.title : item?.title_ar}
        />
      ),
    },
    { header: "sku", field: "sku" },
    {
      header: "price",
      field: "price",
      body: (item) => (item?.price ? formatPrice(item?.price) : 0),
    },
    {
      header: "quantity",
      field: "quantity",
      body: (item) => (item?.quantity > 0 ? `x ${item?.quantity}` : "-"),
    },
    {
      header: "stock",
      field: "stock",
      body: (item) => {
        const { text, type } = productStatusBadge(item?.status);
        return <Badge text={text} type={type} />;
      },
    },
    {
      header: "categories",
      field: "categories",
      body: (item) => (
        <div>
          {item?.categores?.length > 3 ? (
            <div>
              {item?.categores
                ?.slice(0, 3)
                ?.map(({ title, title_ar }) =>
                  currentLanguageCode === "en" ? title : title_ar
                )
                ?.join(", ")}
              <span> +{item?.categores?.length - 3}</span>
            </div>
          ) : (
            item?.categores
              ?.map(({ title, title_ar }) =>
                currentLanguageCode === "en" ? title : title_ar
              )
              ?.join(", ")
          )}
        </div>
      ),
    },
  ];
  return (
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
      />
    </Page_Wraper>
  );
};

export default Product_List;
