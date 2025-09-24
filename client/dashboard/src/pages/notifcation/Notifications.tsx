import React from "react";
import Page_Wraper from "../../components/layout/page_wraper/Page_Wraper";
import usePaginatedData from "../../hooks/usePaginatedData";
import { API } from "../../services/apiUrl";
import Pagination from "../../components/shared/pagination/Pagination";
import type { NotificationType } from "../../common/types/Type";
import Empty from "../../components/shared/empty/Empty";
import { NotificationIcon } from "../../assets/icons/Icon";
import Notification_Item from "./Notification_Item";

export const notifications: NotificationType[] = [
  {
    notificationId: 1,
    type: "order",
    markAsRead: false,
    id: 101,
    message: "You have received a new order.",
    message_ar: "لقد استلمت طلبًا جديدًا.",
  },
  {
    notificationId: 2,
    type: "review",
    markAsRead: false,
    id: 102,
    message: "A customer left a new review.",
    message_ar: "أضاف أحد العملاء مراجعة جديدة.",
  },
  {
    notificationId: 3,
    type: "contact",
    markAsRead: true,
    id: 103,
    message: "You have a new contact message.",
    message_ar: "لديك رسالة جديدة من صفحة التواصل.",
  },
  {
    notificationId: 4,
    type: "outOfStock",
    markAsRead: false,
    id: 104,
    message: "One of your products is out of stock.",
    message_ar: "أحد منتجاتك نفد من المخزون.",
  },
  {
    notificationId: 5,
    type: "achieveGoal",
    markAsRead: true,
    id: 105,
    message: "Congratulations! You achieved your sales goal.",
    message_ar: "تهانينا! لقد حققت هدف المبيعات الخاص بك.",
  },
  {
    notificationId: 6,
    type: "missedGoal",
    markAsRead: false,
    id: 106,
    message: "You missed your weekly sales goal.",
    message_ar: "فاتك هدف المبيعات الأسبوعي.",
  },
];

const Notifications = () => {
  const { data, setData, loading, page, pages, handlePagination } =
    usePaginatedData(API.notification.list);
  return (
    <Page_Wraper
      label="notifications"
      containerClassName="layer shadow_sm p-4 flex flex-col gap-10 min-h-[72vh]"
    >
      <div className="flex-1 flex flex-col gap-6 ">
        {notifications?.length > 0 ? (
          notifications?.map((notification) => (
            <Notification_Item
              key={notification?.notificationId}
              data={notification}
              setData={setData}
            />
          ))
        ) : (
          <Empty />
        )}
      </div>
      <Pagination
        pages={pages}
        currentPage={page}
        onPageChange={handlePagination}
      />
    </Page_Wraper>
  );
};

export default Notifications;
