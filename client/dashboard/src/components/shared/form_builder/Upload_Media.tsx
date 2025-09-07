import React, { useEffect, useRef, useState } from "react";
import type { FormListItemType } from "./Form_Builder-types";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Button from "../button/Button";

import { CloseIcon, UploadCloudIcon } from "../../../assets/icons/Icon";
import { truncateText } from "../../../common/utils/truncateText";

const maxFileSizeInMB = Number(import.meta.env.VITE_REACT_APP_IMAGE_SIZE || 5);
const maxFileSizeInBytes = maxFileSizeInMB * 1024 * 1024;

type UploadMediaProps = {
  variant?: "file" | "profile";
  validTypes?: string[];
  setError?: (name?: string, error?: any) => void;
  error?: any;
  handleChange?: (e: any) => void;
  value?: any;
  item: FormListItemType;
  disabled?: boolean;
};

const Upload_Media: React.FC<UploadMediaProps> = ({
  variant = "file",
  validTypes = ["image/jpeg", "image/png", "image/jpg"],
  setError,
  error,
  handleChange = () => {},
  value,
  item,
  disabled,
}) => {
  const { t } = useTranslation();
  const [media, setMedia] = useState<any>(value || null);
  const isMultiple = item?.isMultiple ?? false;
  const limit = item?.limit ?? 10;
  const setListDeleteImages = item?.setListDeleteImages;
  const fileInputRef = useRef(null);
  const handleFileChange = (
    newFiles: FileList | File[],
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
          })
        );
      }

      const filesToProcess = files.slice(0, emptySlots);
      const newImages: any[] = [];

      filesToProcess.forEach((file, idx) => {
        if (!validTypes.includes(file.type)) {
          toast.error(t("error_image_type"));
          return;
        }

        if (file.size > maxFileSizeInBytes) {
          toast.error(
            `${file.name} - ${t("exceed_limit")} ${maxFileSizeInMB} MB`
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
      handleChange(updatedImages);
    } else {
      const file = (newFiles as FileList)[0];
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
          `${file.name} - ${t("exceed_limit")} ${maxFileSizeInMB} MB`
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
      handleChange(file);
    }

    e.target.value = "";
  };

  const handleRemove = (key: string | number, type?: "id" | "index") => {
    if (isMultiple) {
      if (!Array.isArray(value)) {
        setMedia(null);
        handleChange(null);
        return;
      }

      const updated = value.filter((itm: any, idx: number) => {
        const itemId = itm?.id ?? idx;

        if (itm?.id && itemId === key && type === "id") {
          setListDeleteImages?.((prev: any[]) => [...prev, itm.id]);
        }

        return itemId !== key;
      });

      setMedia(updated);
      handleChange(updated);
    } else {
      if (item?.action) {
        item.action();
      }
      setMedia(null);
      handleChange(null);
    }
  };

  useEffect(() => {
    if (value && item?.isEdit) {
      setMedia(value);
    }
  }, [value, item?.isEdit]);

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
  return <div>Upload_Media</div>;
};

export default Upload_Media;
