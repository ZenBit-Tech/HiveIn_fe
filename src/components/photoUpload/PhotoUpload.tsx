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
import {
  UPLOADING,
  DONE,
  ERROR,
  IS_JPEG,
  IS_PNG,
} from "utils/photoUploadConsts";

function PhotoUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(
    "https://pbs.twimg.com/profile_images/1541920820204797952/RaMNiqHx_400x400.jpg"
  );
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
    if (info.file.status === DONE) {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setIsLoading(false);
        setImageUrl(url);
      });
    }
    if (info.file.status === ERROR) {
      setIsLoading(false);
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
