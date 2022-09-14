import React, { Dispatch, useEffect } from "react";
import { Modal as ModalANTD } from "antd";
import { toast } from "react-toastify";
import { useDeletePostMutation } from "services/jobPosts/setJobPostsAPI";
import { useTranslation } from "react-i18next";

type TProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
  id: number;
};

function Modal({ isOpen, setIsOpen, id }: TProps) {
  const [deletePost, { isSuccess, isError, isLoading }] =
    useDeletePostMutation();
  const { t } = useTranslation();

  useEffect(() => {
    if (isSuccess)
      toast.success(t("EditDeletePost.delete.deletedSuccessfully"));
    if (isError) toast.error(t("EditDeletePost.delete.deleteError"));
  }, [isSuccess, isError]);

  const handleOk = () => {
    deletePost(id);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <ModalANTD
      title={t("EditDeletePost.delete.title")}
      onOk={handleOk}
      confirmLoading={isLoading}
      onCancel={handleCancel}
      visible={isOpen}
    >
      <p>{t("EditDeletePost.delete.deleteConfirmation")}</p>
    </ModalANTD>
  );
}

export default Modal;
