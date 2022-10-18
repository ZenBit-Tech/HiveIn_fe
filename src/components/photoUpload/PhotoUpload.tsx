import React, { useEffect, useState } from "react";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { message, Modal, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { DONE, IS_JPEG, IS_PNG, UPLOADING } from "utils/photoUploadConsts";
import useAuth from "hooks/useAuth";
import { toast } from "react-toastify";
import { AUTH, AVATAR } from "utils/consts/breakpointConsts";
import { useRemoveAvatarMutation } from "services/user/setUserAPI";

interface IPhotoUploadProps {
  avatarUrl?: string;
  refetch: () => void;
}

function PhotoUpload({ avatarUrl, refetch }: IPhotoUploadProps) {
  const { t } = useTranslation();
  const { authToken } = useAuth();

  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [runRemoveAvatar] = useRemoveAvatarMutation();

  useEffect(() => {
    if (avatarUrl)
      setFileList([
        {
          uid: "-1",
          name: "avatar",
          status: "done",
          url: avatarUrl,
        },
      ]);
  }, [avatarUrl]);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      // eslint-disable-next-line no-param-reassign
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === IS_JPEG || file.type === IS_PNG;
    if (!isJpgOrPng) message.error(t("profileUploadPhotoErrors.pngOrJpeg"));

    return isJpgOrPng;
  };

  const handleChange: UploadProps["onChange"] = ({
    file,
    fileList: newFileList,
  }) => {
    if (file.status === UPLOADING) {
      setFileList(newFileList);
      return;
    }

    if (file.status === DONE) toast.success(t("profileSuccessSubmitMessage"));

    refetch();
  };

  return (
    <>
      <ImgCrop rotate>
        <Upload
          name="avatar"
          action={`${process.env.REACT_APP_API_URL}/${AUTH}/${AVATAR}`}
          listType="picture-card"
          maxCount={1}
          fileList={fileList}
          onPreview={handlePreview}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          headers={{ authorization: `Bearer ${authToken}` }}
          onRemove={async () => {
            setFileList([]);
            await runRemoveAvatar();
          }}
        >
          {fileList.length >= 1 ? null : <UserOutlined />}
        </Upload>
      </ImgCrop>
      <Modal visible={previewOpen} footer={null} onCancel={handleCancel}>
        <img alt="avatar" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
}

export default PhotoUpload;
