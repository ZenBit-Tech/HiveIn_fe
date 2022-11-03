import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Control, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import Wrapper, {
  RoleRadio,
  TitleText,
  FormBox,
  ApplyButton,
  ButtonText,
  RadioGroup,
  SForm,
  SDiv,
} from "pages/Auth/CompleteRegistration/CompleteRegistrationStyles";
import useGoogleAuth from "hooks/useGoogleAuth";
import { setUser } from "store/slices/userSlice";
import { WELCOME_ROUTE } from "utils/consts/routeConsts";
import { useUpdateUserMutation } from "services/user/setUserAPI";
import { UserRoleEnum } from "utils/enums";
import Field from "components/DefaultField/DefaultField";
import contactEditFormValidationSchema from "validation/contactEditFormValidationSchema";

interface IFields {
  firstName: string;
  lastName: string;
}

export default function CompleteRegistration() {
  useGoogleAuth();
  const [radioOption, setRadioOption] = useState();

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [updateRole, { isError, isLoading, error }] = useUpdateUserMutation();

  const { control, handleSubmit } = useForm<IFields>({
    resolver: yupResolver(contactEditFormValidationSchema),
  });

  useEffect(() => {
    if (!isLoading && isError) {
      if ("status" in error!) {
        toast.error(t("CompleteRegistration.error"));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const sendToDB = async (firstName?: string, lastName?: string) => {
    navigate(WELCOME_ROUTE);
    dispatch(
      setUser({
        role: radioOption,
      })
    );

    await updateRole({
      role: radioOption,
      firstName,
      lastName,
    });
  };

  const submitHandler = async (data: IFields) => {
    await sendToDB(data.firstName, data.lastName);
  };

  const clickHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await sendToDB();
  };

  return (
    <Wrapper>
      <FormBox>
        <TitleText level={3}>{t("CompleteRegistration.title")}</TitleText>
        <RadioGroup
          onChange={({ target }) => setRadioOption(target.value)}
          value={radioOption}
        >
          <RoleRadio value="client">
            <ButtonText>{t("CompleteRegistration.client")}</ButtonText>
          </RoleRadio>

          <RoleRadio value="freelancer">
            <ButtonText>{t("CompleteRegistration.freelancer")}</ButtonText>
          </RoleRadio>
        </RadioGroup>
        {radioOption === UserRoleEnum.CLIENT && (
          <ApplyButton onClick={clickHandler}>
            {t("CompleteRegistration.button")}
          </ApplyButton>
        )}
        {radioOption === UserRoleEnum.FREELANCER && (
          <SForm onSubmit={handleSubmit(submitHandler)}>
            <TitleText level={5}>
              {t("CompleteRegistration.nameRequirement")}
            </TitleText>
            <SDiv>
              <Field
                label="First name"
                control={control as unknown as Control<any>}
                name="firstName"
              />
              <Field
                label="Last name"
                control={control as unknown as Control<any>}
                name="lastName"
              />
            </SDiv>
            <ApplyButton type="submit">
              {t("CompleteRegistration.button")}
            </ApplyButton>
          </SForm>
        )}
      </FormBox>
    </Wrapper>
  );
}
