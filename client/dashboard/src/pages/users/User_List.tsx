import React, { useState } from "react";
import Page_Wraper from "../../components/layout/page_wraper/Page_Wraper";
import Table_Layout from "../../components/shared/table/Table_Layout";
import type { UserType } from "../../context/Auth_Context.types";
import { API } from "../../services/apiUrl";
import Avatar from "../../components/shared/avatar/Avatar";
import { userStatusBadge } from "../../common/lists/Badges_List";
import Badge from "../../components/shared/badge/Badge";
import { useNavigate } from "react-router-dom";
import Menu from "../../components/shared/menu/Menu";
import {
  CheckIcon,
  EditIcon,
  EmailIcon,
  EyeIcon,
  NotAllowIcon,
  UserIcon,
} from "../../assets/icons/Icon";
import type { MenuListTypes } from "../../components/shared/menu/Menue.types";

const tapList = [
  {
    name: "users",
    value: "user",
    fieldName: "role",
    default: true,
  },
  {
    name: "admin",
    value: "admin",
    fieldName: "role",
  },
];
const blockUser = {
  icon: <NotAllowIcon width="20" height="20" />,
  name: "blocked",
  textClassName: "text-semantic-red-900",
};
const activeUser = {
  icon: (
    <CheckIcon fill="var(--color-semantic-green-900)" width="20" height="20" />
  ),
  name: "active",
  textClassName: "text-semantic-green-900",
};
const list: MenuListTypes = [
  { icon: <EditIcon width="20" height="20" />, name: "update" },
  {
    icon: <EyeIcon width="20" height="20" />,
    name: "details",
  },
  {
    icon: (
      <EmailIcon fill="var(--color-neutral-black-500)" width="20" height="20" />
    ),
    name: "reset_password",
  },
];
const User_List = () => {
  const [filter, setFilter] = useState("user");
  const navigate = useNavigate();
  const columns = [
    {
      header: "name",
      field: "user",
      body: (item) => (
        <div className="truncate flex items-center gap-6">
          <Avatar avatar={item?.avatar} fullName={item?.fullName} />
          <span>{item?.fullName ?? "-"}</span>
        </div>
      ),
    },
    {
      header: "email",
      field: "email",
      body: (item) => item?.email ?? "-",
    },
    {
      header: "phone",
      field: "phone",
      body: (item) =>
        item?.phone ? <span dir="ltr">{item?.phone}</span> : "-",
    },
    filter === "user" && {
      header: "address",
      field: "address",
      body: (item) => item?.address ?? "-",
    },
    {
      header: "status",
      field: "status",
      body: (item) => {
        const { text, type } = userStatusBadge(item?.status);
        return <Badge text={text} type={type} />;
      },
    },
    {
      header: "action",
      field: "action",
      body: (item) => (
        <Menu
          list={[...list, item?.status === "active" ? blockUser : activeUser]}
        />
      ),
    },
  ];

  return (
    <Page_Wraper
      label={filter === "user" ? "users" : "admin"}
      hasBtn={filter === "admin"}
      btnName="add_admin"
      btnCta={() => {
        navigate("/users/create");
      }}
    >
      <Table_Layout<UserType>
        hasPagination={true}
        columns={columns}
        emptyText={filter === "user" ? "no_users_yet" : "no_admin_yet"}
        endpoint={API.users.list}
        search_placeholder={filter === "user" ? "search_user" : "search_admin"}
        hasTap={true}
        tapList={tapList}
        tapType="click"
        queryDefault={{ role: filter }}
        onClick={(val) => {
          setFilter(val);
        }}
      />
    </Page_Wraper>
  );
};

export default User_List;
