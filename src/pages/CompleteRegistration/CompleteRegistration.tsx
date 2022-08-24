import { useEffect } from "react";
import Wrapper, {
  RoleRadio,
  TitleText,
  FormBox,
  ApplyButton,
  ButtonText,
  RadioGroup,
} from "pages/CompleteRegistration/CompleteRegistrationStyles";
import useGoogleAuth from "hooks/useGoogleAuth";
import useJwtDecoder from "hooks/useJwtDecoder";
import { useTranslation } from "react-i18next";
import { RadioChangeEvent } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/store";
import { setUser } from "store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { WELCOME_ROUTE } from "utils/routeConsts";
import { useUpdateUserMutation } from "services/user/setUserAPI";
import { toast } from "react-toastify";

export default function CompleteRegistration() {
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
      navigate(WELCOME_ROUTE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const setRole = (e: RadioChangeEvent) => {
    dispatch(
      setUser({
        role: e.target.value,
      })
    );
  };

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
        <RadioGroup onChange={setRole} value={role}>
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
        <ApplyButton role={role} onClick={sendToDB}>
          {t("CompleteRegistration.button")}
        </ApplyButton>
      </FormBox>
    </Wrapper>
  );
}
