// import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import useAuth from "hooks/useAuth";
import { useGoogleOAuthSignInQuery } from "services/auth/signInAPI";
import Wrapper, {
  RoleRadio,
  TitleText,
  FormBox,
  ApplyButton,
  ButtonText,
  RadioGroup,
} from "pages/CompleteRegistration/CompleteRegistrationStyles";

export default function CompleteRegistration() {
  const { t } = useTranslation();
  const { signIn } = useAuth();
  const {
    data: signInResponse,
    isLoading,
    isSuccess,
  } = useGoogleOAuthSignInQuery();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      signIn(signInResponse);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <Wrapper>
      <FormBox>
        <TitleText level={3}> {t("CompleteRegistration.title")}</TitleText>
        <RadioGroup>
          <RoleRadio value={1}>
            <ButtonText level={5}>
              {t("CompleteRegistration.client")}
            </ButtonText>
          </RoleRadio>

          <RoleRadio value={2}>
            <ButtonText level={5}>
              {t("CompleteRegistration.freelancer")}
            </ButtonText>
          </RoleRadio>
        </RadioGroup>
        <ApplyButton>Create My Account</ApplyButton>
      </FormBox>
    </Wrapper>
  );
}
