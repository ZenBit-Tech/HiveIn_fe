import React, { Dispatch, useEffect } from "react";
import { Modal as ModalANTD } from "antd";
import { toast } from "react-toastify";
import { useDeletePostMutation } from "services/jobPosts/setJobPostsAPI";

type TProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
  id: number;
};

function Modal({ isOpen, setIsOpen, id }: TProps) {
  const [deletePost, { isSuccess, isError, isLoading }] =
    useDeletePostMutation();

  useEffect(() => {
    if (isSuccess) toast.success("Deleted successfully");
    if (isError) toast.error("Something went wrong");
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
      title="Delete job post"
      onOk={handleOk}
      confirmLoading={isLoading}
      onCancel={handleCancel}
      visible={isOpen}
    >
      <p>Confirm deletion of job post</p>
    </ModalANTD>
  );
}

export default Modal;
