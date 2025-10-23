import React, { useState } from "react";
import Page_Wraper from "../../components/layout/page_wraper/Page_Wraper";

import Table_Layout from "../../components/shared/table/Table_Layout";
import { API } from "../../services/apiUrl";
import Read_More from "../../components/shared/read_more/Read_More";
import type { SupportType } from "../../common/constant/types";
import Button from "../../components/shared/button/Button";
import Menu from "../../components/shared/menu/Menu";
import { useTranslation } from "react-i18next";
import {
  CheckIcon,
  EmailIcon,
  EyeIcon,
  MarkunreadIcon,
  TrashIcon,
} from "../../assets/icons/Icon";
import type { MenuListTypes } from "../../components/shared/menu/Menue.types";
import { useNavigate } from "react-router-dom";
import {
  readSupportTicketBadgeList,
  supportTicketStatusBadge,
} from "../../common/lists/Badges_List";
import Badge from "../../components/shared/badge/Badge";
import { formatDateToMonth } from "../../common/utils/formatDateToMonth";
import Confirmation_Modal from "../../components/shared/modal/Confirmation_Modal";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "react-toastify";
import { handleError } from "../../common/utils/handleError";
import Modal from "../../components/shared/modal/modal/Modal";
import Reply from "./component/Reply";
const Contact = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [deleteLoader, setDeleteLoader] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState<number | null>();
  const [refetch, setRefetch] = useState();
  const [replyModal, setReplyModal] = useState(false);
  const [value, setValue] = useState();
  const list: MenuListTypes[] = [
    {
      icon: <EyeIcon width="20" height="20" />,
      name: "details",
      action: (item) => {
        navigate(`/contact/${item?.id}`);
      },
    },

    {
      icon: (
        <EmailIcon
          fill="var(--color-neutral-black-500)"
          width="20"
          height="20"
        />
      ),
      name: "reply",
      action: (item) => {
        setId(item?.id);
        setReplyModal(true);
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
  const readList: MenuListTypes[] = [
    {
      icon: <CheckIcon width="20" height="20" />,
      name: "mark_as_read",
      action: (item) => {
        toggleRead(item?.id);
      },
    },
  ];
  const unReadList: MenuListTypes[] = [
    {
      icon: <MarkunreadIcon width="20" height="20" />,
      name: "mark_as_unread",
      action: (item) => {
        toggleRead(item?.id);
      },
    },
  ];
  const columns = [
    {
      header: "name",
      field: "fullName",
      body: (item) => (
        <span className={item?.isDeleted ? "deleted_row" : ""}>
          {item?.fullName ?? "-"}
        </span>
      ),
    },
    {
      header: "email",
      field: "email",
      body: (item) => (
        <span className={item?.isDeleted ? "deleted_row" : ""}>
          {item?.email ?? "-"}
        </span>
      ),
    },
    {
      header: "message",
      field: "message",
      body: (item) => (
        <div className={item?.isDeleted ? "deleted_row" : ""}>
          <Read_More text={item?.message} />
        </div>
      ),
    },
    {
      header: "status",
      field: "status",
      body: (item) => {
        const { text, type } = supportTicketStatusBadge(item?.status);
        return (
          <div className={item?.isDeleted ? "deleted_row" : ""}>
            <Badge text={text} type={type} />
          </div>
        );
      },
    },
    {
      header: "read",
      field: "read",
      body: (item) => {
        const { text, type } = readSupportTicketBadgeList(item?.isRead);
        return (
          <div className={item?.isDeleted ? "deleted_row" : ""}>
            <Badge text={text} type={type} />
          </div>
        );
      },
    },
    {
      header: "createdAt",
      field: "createdAt",
      body: (item) => (
        <span className={item?.isDeleted ? "deleted_row" : ""}>
          {item?.createdAt ? formatDateToMonth(item?.createdAt) : "-"}
        </span>
      ),
    },
    {
      header: "solvedAt",
      field: "solvedAt",
      body: (item) => (
        <span className={item?.isDeleted ? "deleted_row" : ""}>
          {item?.solvedAt ? formatDateToMonth(item?.solvedAt) : "-"}
        </span>
      ),
    },
    {
      header: "repliedAt",
      field: "repliedAt",
      body: (item) => (
        <span className={item?.isDeleted ? "deleted_row" : ""}>
          {item?.repliedAt ? formatDateToMonth(item?.repliedAt) : "-"}
        </span>
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
            <Menu<SupportType>
              list={
                item?.isRead ? [...unReadList, ...list] : [...readList, ...list]
              }
              data={item}
            />
          )}
        </div>
      ),
    },
  ];
  const deleteSupport = async () => {
    try {
      setDeleteLoader(true);
      const respone = await axiosInstance.delete(`${API.contact.main}/${id}`);
      if (respone.status === 204) {
        toast.success(t("success_delete_support"));
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

  const toggleRead = async (itemId) => {
    try {
      const response = await axiosInstance.patch(
        `${API.contact.main}/${itemId}/read`
      );
      if (response.status === 200) {
        toast.success(t("successfully_update_read_status"));
        value?.((prev) =>
          prev.map((item) => (item?.id === itemId ? response.data : item))
        );
      }
    } catch (err) {
      handleError(err, t);
    }
  };
  const restore = async (itemId) => {
    try {
      const response = await axiosInstance.patch(
        `${API.contact.main}/${itemId}/restore`
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
      <Page_Wraper label="contact">
        <Table_Layout<SupportType>
          hasPagination={true}
          columns={columns}
          emptyText="no_contact_messages_yet"
          endpoint={API.contact.main}
          search_placeholder="search_by_fullName_email"
          refetch={refetch}
          setValue={setValue}
        />
      </Page_Wraper>
      <Confirmation_Modal
        open={deleteModal}
        onClose={() => {
          setDeleteModal(false);
        }}
        title="confirm_delete_support"
        mainBtnText="delete_support"
        mainBtnCta={deleteSupport}
        loading={deleteLoader}
      />
      <Modal
        open={replyModal}
        onClose={() => {
          setReplyModal(false);
        }}
        title="reply"
      >
        <Reply
          id={id}
          onClose={() => {
            setReplyModal(false);
          }}
          value={value}
        />
      </Modal>
    </>
  );
};

export default Contact;
