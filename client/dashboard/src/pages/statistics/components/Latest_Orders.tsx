import type { OrderType } from "../../../common/types/Type";
import useGetData from "../../../hooks/useGetData";
import { API } from "../../../services/apiUrl";
import Product_Item from "../../../components/shared/product/Product_Item";
import { currentLanguageCode } from "../../../common/utils/switchLang";
import { formatDateToMonth } from "./../../../common/utils/formatDateToMonth";
import { formatPrice } from "../../../common/utils/formatPrice";
import { orderStatusBadge } from "../../../common/lists/Badges_List";
import Badge from "../../../components/shared/badge/Badge";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Table from "../../../components/shared/table/Table";

export const data: OrderType[] = [
  {
    id: 1,
    image: null,
    title: "Raw Black T-Shirt Lineup",
    title_ar: "تشكيلة القمصان السوداء الخام",
    createdAt: "2025-09-01T10:15:00",
    status: "pending",
    price: 75.0,
    quantity: 1,
  },
  {
    id: 2,
    image: null,
    title: "Classic White Hoodie",
    title_ar: "هودي أبيض كلاسيكي",
    createdAt: "2025-09-03T14:45:00",
    status: "completed",
    price: 120.0,
    quantity: 4,
  },
  {
    id: 3,
    image: null,
    title: "Blue Denim Jacket",
    title_ar: "جاكيت دنيم أزرق",
    createdAt: "2025-09-05T09:30:00",
    status: "shipped",
    price: 200.0,
    quantity: 8,
  },
  {
    id: 4,
    image: null,
    title: "Sport Running Shoes",
    title_ar: "أحذية رياضية للجري",
    createdAt: "2025-09-07T19:20:00",
    status: "cancelled",
    price: 95.5,
    quantity: 2,
  },
  {
    id: 5,
    image: null,
    title: "Leather Handbag",
    title_ar: "حقيبة يد جلدية",
    createdAt: "2025-09-09T08:10:00",
    status: "completed",
    price: 310.0,
    quantity: 5,
  },
];

const columns = [
  {
    header: "title",
    field: "title",
    body: (item) => (
      <Product_Item
        avatar={item?.image}
        title={currentLanguageCode === "en" ? item?.title : item?.title_ar}
      />
    ),
  },
  {
    header: "date",
    field: "createdAt",
    body: (item) =>
      item?.createdAt ? formatDateToMonth(item?.createdAt) : "-",
  },
  {
    header: "quantity",
    field: "quantity",
    body: (item) => (item?.quantity > 0 ? `x ${item?.quantity}` : "-"),
  },
  {
    header: "total",
    field: "price",
    body: (item) => (item?.price ? formatPrice(item?.price) : 0),
  },
  {
    header: "status",
    field: "status",
    body: (item) => {
      const { text, type } = orderStatusBadge(item?.status);
      return <Badge text={text} type={type} />;
    },
  },
];
const Latest_Orders = () => {
  const { data: k, loading } = useGetData(API.dashboard.latestOrders);
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <section className={`layer shadow_sm p-6 flex flex-col gap-6 `}>
      <h2 className="text-primary h4 font-medium">{t("latest_order")}</h2>
      <Table<OrderType>
        loading={loading}
        emptyText="no_latest_orders_yet"
        columns={columns}
        data={data}
        rowAction={(row) => {
          navigate("/orders/");
        }}
      />
    </section>
  );
};
export default Latest_Orders;
