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
import useJwtDecoder from "hooks/useJwtDecoder";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/store";
import { setUser } from "store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { WELCOME_ROUTE } from "utils/routeConsts";
import { useUpdateUserMutation } from "services/user/setUserAPI";
import { toast } from "react-toastify";

export default function CompleteRegistration() {
  const [radioOption, setRadioOption] = useState();
  const { role } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { sub } = useJwtDecoder();

  const { t } = useTranslation();
  const navigate = useNavigate();

  const [updateRole, { isSuccess, isError, isLoading, error }] =
    useUpdateUserMutation();

  useGoogleAuth();

  useEffect(() => {
    if (!isLoading && isError) {
      if ("status" in error!) {
        toast.error(t("CompleteRegistration.error"));
      }
      return;
    }
    if (!isLoading && isSuccess) {
      dispatch(
        setUser({
          role: radioOption,
        })
      );
      navigate(WELCOME_ROUTE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const sendToDB = () => {
    updateRole({
      id: sub,
      role,
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
