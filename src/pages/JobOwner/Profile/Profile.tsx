/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Button } from "antd";
import TextField from "components/UI/textField/TextField";
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

interface ClientForm extends FieldValues {
  name: string;
  description?: string;
}

export default function ClientProfile() {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ClientForm>({
    resolver: yupResolver(resolver),
  });
  const { t } = useTranslation();

  const [runMutation, { isError, isLoading, isSuccess }] =
    useUpdateUserMutation();

  const {
    data,
    isLoading: queryLoad,
    isSuccess: querySuccess,
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
    if (!isLoading && isError) toast.error("Something went wrong");
    if (!isLoading && isSuccess) {
      toast.success("Profile uploaded");
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
        <div style={{ width: "50%" }}>
          <S.InputBox>
            <TextField
              errors={errors}
              formFieldName="name"
              type="text"
              width="full"
              helperText="Name*"
              control={control}
            />
          </S.InputBox>
          <S.InputBox>
            <TextField
              errors={errors}
              formFieldName="description"
              multiline
              type="text"
              width="full"
              helperText="Description of your company"
              rows={5}
              control={control}
            />
          </S.InputBox>
          <Button htmlType="submit" shape="round" size="large" type="primary">
            {t("Dashboard.buttons.save")}
          </Button>
        </div>
      </S.Form>
    </S.Container>
  );
}
