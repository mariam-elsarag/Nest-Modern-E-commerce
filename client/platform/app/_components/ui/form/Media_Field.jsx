"use client";
import { CloseIcon, UploadCloudIcon } from "@/app/_assets/icons/Icon";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Avatar from "../Avatar";
import Button from "../Button";

const Media_Field = ({ setError, error, field, item, disabled }) => {
  const t = useTranslations();
  const value = field.value || item.value || "";
  const [media, setMedia] = useState(value || null);
  const isMultiple = item?.isMultiple ?? false;
  const limit = item?.limit ?? 10;
  const setListDeleteImages = item?.setListDeleteImages;
  const fileInputRef = useRef(null);
  const [isChanged, setIsChanged] = useState(false);

  const variant = item?.variant ?? "file";
  const validTypes = item?.validTypes ?? [
    "image/jpeg",
    "image/png",
    "image/jpg",
  ];

  const handleFileChange = (newFiles, e) => {
    if (variant === "profile") {
      setError?.();
    }

    if (isMultiple) {
      const files = Array.from(newFiles);
      const existingImages = value || [];
      const emptySlots = limit - existingImages.length;

      if (emptySlots <= 0) {
        toast.error(t("only_upload_images", { limit }));
        return;
      }

      if (files.length > emptySlots) {
        toast.info(
          t("you_selected_but_we_accept", {
            length: files.length,
            emptySlots,
          }),
        );
      }

      const filesToProcess = files.slice(0, emptySlots);
      const newImages = [];

      filesToProcess.forEach((file, idx) => {
        if (!validTypes.includes(file.type)) {
          toast.error(t("error_image_type"));
          return;
        }

        if (file.size > maxFileSizeInBytes) {
          toast.error(
            `${file.name} - ${t("exceed_limit")} ${maxFileSizeInMB} MB`,
          );
          return;
        }

        const fileNameParts = file.name.split(".");
        const ext = fileNameParts.pop();
        const baseName = fileNameParts.join(".");
        const truncatedName =
          file.name.length > 100
            ? `${baseName.substring(0, 10)}.${ext}`
            : file.name;

        const finalFile = new File([file], truncatedName, { type: file.type });

        newImages.push({
          id: `${Date.now()}-${idx}`,
          image: finalFile,
          preview: URL.createObjectURL(finalFile),
        });
      });

      const updatedImages = [...existingImages];
      let newImgIdx = 0;

      for (
        let i = 0;
        i < updatedImages.length && newImgIdx < newImages.length;
        i++
      ) {
        if (!updatedImages[i]?.image) {
          updatedImages[i] = newImages[newImgIdx++];
        }
      }

      while (newImgIdx < newImages.length) {
        updatedImages.push(newImages[newImgIdx++]);
      }

      setMedia(updatedImages);
      field.onChange(updatedImages);
    } else {
      const file = newFiles[0];
      if (!file) return;

      if (!validTypes.includes(file.type)) {
        toast.error(t("error_image_type"));
        setError?.(item?.name, {
          type: "manual",
          message: "error_image_type",
        });
        return;
      }

      if (file.size > maxFileSizeInBytes) {
        toast.error(
          `${file.name} - ${t("exceed_limit")} ${maxFileSizeInMB} MB`,
        );
        setError?.(item?.name, {
          type: "manual",
          message: `${file.name} - ${t("exceed_limit")} ${maxFileSizeInMB} MB`,
        });
        return;
      }

      const mediaPreview =
        variant === "file" ? file : URL.createObjectURL(file);
      setMedia(mediaPreview);
      field.onChange(file);
      if (!isChanged) {
        setIsChanged(true);
      }
    }
    e.target.value = "";
  };

  const handleRemove = (key, type) => {
    if (isMultiple) {
      if (!Array.isArray(value)) {
        setMedia(null);
        field.onChange(null);
        return;
      }

      const updated = value.filter((itm, idx) => {
        const itemId = itm?.id ?? idx;

        if (itm?.id && itemId === key && type === "id") {
          setListDeleteImages?.((prev) => [...prev, itm.id]);
        }

        return itemId !== key;
      });

      setMedia(updated);
      field.onChange(updated);
    } else {
      if (item?.action) {
        item.action();
      }
      setMedia(null);
      field.onChange(null);
    }
  };

  useEffect(() => {
    if (!isChanged) {
      setMedia(value);
    }
  }, [value, item?.isEdit, isChanged]);
  if (variant === "file") {
    return (
      <div className="flex  flex-col gap-3">
        <Button
          icon={<UploadCloudIcon />}
          iconDirection="left"
          variant="outline"
          text={item?.title}
          round="lg"
          handleClick={() => fileInputRef.current?.click()}
        />

        {media && (
          <div className="flex items-center gap-2 hover:bg-neutral-white-100 rounded-lg w-fit p-1.5 md:p-2.5 transition-all ease-in-out duration-300 ">
            <p className="body text-neutral-black-500 truncate ">
              {media?.name
                ? (() => {
                    const parts = media.name.split(".");
                    const ext = parts.pop();
                    const baseName = parts.join(".");
                    return `${truncateText(baseName, 20, false)}.${ext}`;
                  })()
                : "-"}
            </p>
            <span
              className="cursor-pointer"
              role="button"
              onClick={handleRemove}
            >
              <CloseIcon />
            </span>
          </div>
        )}

        <input
          type="file"
          id={item?.id}
          className="hidden"
          accept=".pdf"
          onChange={(e) => handleFileChange(e.target.files, e)}
          disabled={disabled}
          ref={fileInputRef}
        />
      </div>
    );
  }
  return (
    <div className="relative w-fit  group">
      <Avatar avatar={media} fullName={item.name} size="lg" />
      <Button
        icon={<EditIcon fill="white" width="18" height="18" />}
        variant="outline"
        size="xs"
        round="full"
        className="absolute opacity-0 hover:opacity-100 !border-none  bottom-0 end-0  !h-full !w-full  !bg-black/40 "
        handleClick={() => fileInputRef.current?.click()}
      />
      <input
        type="file"
        id={item?.id}
        className="hidden"
        accept=".jpg,.png,.jpeg"
        onChange={(e) => handleFileChange(e.target.files, e)}
        disabled={disabled}
        ref={fileInputRef}
      />
    </div>
  );
};

export default Media_Field;
