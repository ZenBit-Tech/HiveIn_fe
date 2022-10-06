import React, { useState } from "react";
import type {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload/interface";
import { message, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { LoadingOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { UPLOADING, IS_JPEG, IS_PNG } from "utils/photoUploadConsts";
import useAuth from "hooks/useAuth";
import { toast } from "react-toastify";

interface IPhotoUploadProps {
  avatarUrl?: string;
  refetch: () => void;
}

function PhotoUpload({ avatarUrl, refetch }: IPhotoUploadProps) {
  const { authToken } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { t } = useTranslation();

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === IS_JPEG || file.type === IS_PNG;
    if (!isJpgOrPng) message.error(t("profileUploadPhotoErrors.pngOrJpeg"));

    return isJpgOrPng;
  };

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === UPLOADING) {
      setIsLoading(true);
      return;
    }

    getBase64(info.file.originFileObj as RcFile, async (url) => {
      setIsLoading(false);
      setImageUrl(url);
      refetch();
      toast.success(t("profileSuccessSubmitMessage"));
    });
  };

  return (
    <ImgCrop>
      <Upload
        name="avatar"
        action="http://localhost:4000/auth/avatar"
        listType="picture-card"
        maxCount={1}
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        headers={{ authorization: `Bearer ${authToken}` }}
      >
        {(avatarUrl || imageUrl) && !isLoading ? (
          <img
            src={imageUrl! || avatarUrl!}
            alt="avatar"
            style={{ width: "100%" }}
          />
        ) : (
          <div>
            {isLoading ? <LoadingOutlined /> : <UserOutlined />}
            <p>{t("profileUploadPhoto.input")}</p>
          </div>
        )}
      </Upload>
    </ImgCrop>
  );
}

export default PhotoUpload;
