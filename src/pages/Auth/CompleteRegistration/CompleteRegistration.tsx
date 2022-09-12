import { useEffect, useState } from "react";
import Wrapper, {
  RoleRadio,
  TitleText,
  FormBox,
  ApplyButton,
  ButtonText,
  RadioGroup,
} from "pages/Auth/CompleteRegistration/CompleteRegistrationStyles";
import useGoogleAuth from "hooks/useGoogleAuth";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setUser } from "store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { WELCOME_ROUTE } from "utils/consts/routeConsts";
import { useUpdateUserMutation } from "services/user/setUserAPI";
import { toast } from "react-toastify";

export default function CompleteRegistration() {
  useGoogleAuth();
  const [radioOption, setRadioOption] = useState();

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [updateRole, { isError, isLoading, error }] = useUpdateUserMutation();

  useEffect(() => {
    if (!isLoading && isError) {
      if ("status" in error!) {
        toast.error(t("CompleteRegistration.error"));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const sendToDB = async () => {
    navigate(WELCOME_ROUTE);
    dispatch(
      setUser({
        role: radioOption,
      })
    );

    await updateRole({
      role: radioOption,
    });
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
            <ButtonText level={5}>
              {t("CompleteRegistration.client")}
            </ButtonText>
          </RoleRadio>

          <RoleRadio value="freelancer">
            <ButtonText level={5}>
              {t("CompleteRegistration.freelancer")}
            </ButtonText>
          </RoleRadio>
        </RadioGroup>
        <ApplyButton role={radioOption} onClick={sendToDB}>
          {t("CompleteRegistration.button")}
        </ApplyButton>
      </FormBox>
    </Wrapper>
  );
}
