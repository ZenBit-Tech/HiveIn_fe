import React, { Dispatch, useEffect } from "react";
import { Modal as ModalANTD } from "antd";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useDeletePostMutation } from "services/jobPosts/setJobPostsAPI";
import { useTranslation } from "react-i18next";
import { MY_JOBS_ROUTE } from "utils/consts/routeConsts";

type TProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
  id: number;
};

function Modal({ isOpen, setIsOpen, id }: TProps) {
  const [deletePost, { isSuccess, isError, isLoading }] =
    useDeletePostMutation();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const postRoute = `${MY_JOBS_ROUTE}/${id}`;

  useEffect(() => {
    if (isSuccess)
      toast.success(t("EditDeletePost.delete.deletedSuccessfully"));
    if (isError) toast.error(t("EditDeletePost.delete.deleteError"));
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [isSuccess, isError]);

  const handleOk = () => {
    deletePost(id);
    if (pathname === postRoute) navigate(MY_JOBS_ROUTE);
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
