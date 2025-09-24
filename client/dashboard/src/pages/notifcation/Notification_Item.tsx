import React from "react";
import type { NotificationType } from "../../common/types/Type";
import {
  AlermIcon,
  CartIcon,
  EmailIcon,
  LogoIcon,
  ShieldCheckIcon,
  StarIcon,
  TrophyIcon,
  VerifyIcon,
  WarningIcon,
} from "../../assets/icons/Icon";
import { currentLanguageCode } from "../../common/utils/switchLang";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import { API } from "../../services/apiUrl";
type notificationItemProps = {
  data: NotificationType;
  setData: React.Dispatch<React.SetStateAction<any>>;
};
const Notification_Item = ({ data, setData }: notificationItemProps) => {
  const navigate = useNavigate();

  // ---------------------- function ---------------
  const toggleReadNotification = async () => {
    try {
      const response = await axiosInstance.patch(
        `${API.notification.update}${data?.notificationId}/`
      );
      if (response.status === 200) {
        setData((pre) =>
          pre.map((item) =>
            item?.notificationId === data?.notificationId
              ? { ...item, markAsRead: true }
              : item
          )
        );
      }
    } catch (err) {
      // console.log(err)
    }
  };
  const notificationIconAndLink = () => {
    switch (data?.type) {
      case "review":
        return {
          icon: <StarIcon fill="var(--color-semantic-yellow-800)" />,
          link: "/reviews",
        };
      case "order":
        return {
          icon: <CartIcon fill="var(--color-primary-800)" />,
          link: "/orders",
        };
      case "contact":
        return {
          icon: <EmailIcon fill="var(--color-neutral-black-500)" />,
          link: "/contact",
        };
      case "achieveGoal":
        return {
          icon: <TrophyIcon fill="var(--color-semantic-yellow-700)" />,
          link: "/setting",
        };
      case "outOfStock":
        return {
          icon: <WarningIcon fill="var(--color-semantic-red-900)" />,
          link: `/products/${data?.id}/edit`,
        };
      case "missedGoal":
        return {
          icon: <AlermIcon fill="var(--color-semantic-red-800)" />,
          link: "/setting",
        };
      default:
        return { icon: <LogoIcon width="24" height="24" /> };
    }
  };
  const { icon, link } = notificationIconAndLink();
  return (
    <div
      onClick={() => {
        if (link) {
          navigate(link);
        }
        if (!data?.markAsRead) {
          toggleReadNotification();
        }
      }}
      className={`p-3 rounded-lg flex items-center gap-2 ${
        link ? "cursor-pointer" : "cursor-default"
      }  ${
        data?.markAsRead ? "text-neutral-black-900" : " text-neutral-black-300"
      } body `}
    >
      <span
        className={`flex items-center justify-center w-10 h-10 rounded-full  bg-neutral-white-100/60`}
      >
        {icon}
      </span>
      <p>{currentLanguageCode === "en" ? data?.message : data?.message_ar}</p>
    </div>
  );
};

export default Notification_Item;
