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

function PhotoUpload() {
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
    if (info.file.status === UPLOADING) setIsLoading(true);
    else {
      getBase64(info.file.originFileObj as RcFile, async (url) => {
        setIsLoading(false);
        setImageUrl(url);
      });
    }
  };

  return (
    <>
      <h2>{t("profileUploadPhoto.title")}</h2>
      <ImgCrop>
        <Upload
          name="avatar"
          listType="picture-card"
          maxCount={1}
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            <div>
              {isLoading ? <LoadingOutlined /> : <UserOutlined />}
              <p>{t("profileUploadPhoto.input")}</p>
            </div>
          )}
        </Upload>
      </ImgCrop>
    </>
  );
}

export default PhotoUpload;
