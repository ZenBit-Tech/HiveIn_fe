/* eslint-disable */
import React, { Dispatch, useEffect } from "react";
import { Modal as ModalANTD } from "antd";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import {
  IUpdateParams,
  useUpdatePostMutation,
} from "services/jobPosts/setJobPostsAPI";
import FormSubmitButton from "../../buttons/formSubmitButton/FormSubmitButton";
import { useGetOwnUserQuery } from "../../../../services/user/setUserAPI";

type TProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
  id: number;
};

function Modal({ isOpen, setIsOpen, id }: TProps) {
  const [updatePost, { isSuccess, isError, isLoading }] =
    useUpdatePostMutation();
  const { data: userData, isError: getUserError } = useGetOwnUserQuery();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ jobDescription: ""; rate: 0 }>();

  useEffect(() => {
    if (isSuccess) toast.success("Edited successfully");
    if (isError) toast.error("Something went wrong");
  }, [isSuccess, isError]);

  const handleOk = () => {
    // handleSubmit(onSubmit);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const onSubmit = (data: { jobDescription: string; rate: number }) => {
    const objToRequest: IUpdateParams = {
      ...data,
      postId: id,
      userId: userData?.id!,
    };
    updatePost(objToRequest);
  };

  return (
    <>
      <ModalANTD
        footer={null}
        title="Edit job post"
        onOk={handleOk}
        onCancel={handleCancel}
        visible={isOpen}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <input defaultValue="test" {...register("rate")} />
          <input {...register("jobDescription")} />
          <FormSubmitButton text="edit post" />
        </form>
      </ModalANTD>
    </>
  );
}

export default Modal;
