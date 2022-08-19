import Wrapper, {
  RoleRadio,
  TitleText,
  FormBox,
  ApplyButton,
  ButtonText,
  RadioGroup,
} from "pages/CompleteRegistration/CompleteRegistrationStyles";
import { useTranslation } from "react-i18next";
import { RadioChangeEvent } from "antd";
import useGoogleAuth from "hooks/useGoogleAuth";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/store";
import { setUser } from "store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { SETTINGS_ROUTE } from "utils/routeConsts";
import { useSetUserMutation } from "services/user/setUserAPI";

export default function CompleteRegistration() {
  const { id, role } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [updateRole] = useSetUserMutation();

  const { t } = useTranslation();
  const navigate = useNavigate();

  useGoogleAuth();

  const setRole = (e: RadioChangeEvent) => {
    dispatch(
      setUser({
        role: e.target.value,
      })
    );
  };

  const sendToDB = () => {
    updateRole({
      id,
      role,
    });
    navigate(SETTINGS_ROUTE);
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
          Create My Account
        </ApplyButton>
      </FormBox>
    </Wrapper>
  );
}
