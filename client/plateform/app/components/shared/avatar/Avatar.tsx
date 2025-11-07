import React from "react";
import type { AvatarPropsType } from "./Avatar.types";

const Avatar = ({ avatar, fullName, size = "sm" }: AvatarPropsType) => {
  const sizes = {
    lg: "w-[90px] h-[90px]",
    sm: "w-[48px] h-[48px]",
  };
  const base = ` ${sizes[size]} rounded-full flex items-center justify-center text-center`;
  const nameArray = fullName?.trim()?.split(" ")?.filter(Boolean);
  const initials =
    nameArray?.length > 0
      ? nameArray[0][0].toUpperCase() + (nameArray[1]?.[0]?.toUpperCase() || "")
      : "";

  return (
    <figure className={`${base}`}>
      {avatar ? (
        <img
          src={avatar}
          alt="avatar"
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <p className="w-full h-full rounded-full flex items-center justify-center text-center bg-primary-100 text-primary-900 body">
          {initials}
        </p>
      )}
    </figure>
  );
};

export default Avatar;
