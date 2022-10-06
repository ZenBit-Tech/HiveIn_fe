/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";

import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import {
  useGetOwnUserQuery,
  useUpdateUserMutation,
} from "services/user/setUserAPI";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "store/slices/userSlice";
import { store } from "store/store";
import S from "pages/JobOwner/Profile/style";
import resolver from "pages/JobOwner/Profile/schema";
import PhotoUpload from "components/photoUpload/PhotoUpload";
import SendButton from "components/UI/buttons/SendButton/SendButton";
import Field from "components/DefaultField/DefaultField";
import { Typography } from "antd";

const { Title } = Typography;

interface ClientForm extends FieldValues {
  name: string;
  description?: string;
}

export default function ClientProfile() {
  const { control, handleSubmit, setValue, getValues } = useForm<ClientForm>({
    resolver: yupResolver(resolver),
  });
  const { t } = useTranslation();

  const [runMutation, { isError, isLoading, isSuccess }] =
    useUpdateUserMutation();

  const {
    data,
    isLoading: queryLoad,
    isSuccess: querySuccess,
    refetch,
  } = useGetOwnUserQuery();

  const dispatch = useDispatch();
  const { getState } = store;
  const { user } = getState();

  function setValuesByQueryData() {
    if (data && data.firstName) {
      setValue("name", data?.firstName);
      setValue("description", data.description);
    }
  }

  function setValuesByStoredData() {
    if (user && user.firstName) {
      setValue("name", user?.firstName);
      setValue("description", user.description);
    }
  }

  useEffect(() => {
    if (user.firstName) {
      setValuesByStoredData();
    }
  }, []);

  useEffect(() => {
    if (!queryLoad && querySuccess && !user.firstName) setValuesByQueryData();
  }, [queryLoad]);

  useEffect(() => {
    if (!isLoading && isError) toast.error(t("ServerErrors.500"));
    if (!isLoading && isSuccess) {
      toast.success(t("profileSuccessSubmitMessage"));
      dispatch(
        setUser({
          firstName: getValues("name"),
          description: getValues("description"),
        })
      );
    }
  }, [isError, isLoading, isSuccess]);

  async function onSubmit({ name, description }: ClientForm) {
    await runMutation({
      firstName: name,
      description,
    });
  }

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <Title level={3}>{t("contactInfoForm.pic")}</Title>
        <div>
          <PhotoUpload avatarUrl={data?.avatar?.url} refetch={refetch} />
        </div>
        <Field label="Name" control={control} name="name" />
        <Field
          label={t("ProfileEditForm.description.title")}
          control={control}
          name="description"
          textArea
        />
        <SendButton>{t("Dashboard.buttons.save")}</SendButton>
      </S.Form>
    </S.Container>
  );
}
