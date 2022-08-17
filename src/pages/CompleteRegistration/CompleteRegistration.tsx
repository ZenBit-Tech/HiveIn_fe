import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import useAuth from "hooks/useAuth";
import { useGoogleOAuthSignInQuery } from "services/auth/signInAPI";
import { Modal } from "antd";
import { HOME_PAGE_ROUTE } from "utils/routeConsts";
import { useNavigate } from "react-router-dom";

export default function CompleteRegistration() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const {
    data: signInResponse,
    isLoading,
    isError,
    isSuccess,
  } = useGoogleOAuthSignInQuery();

  useEffect(() => {
    if (!isLoading && isError) {
      Modal.error({
        title: t("SignIn.errorGoogleOAuth"),
        centered: true,
        okButtonProps: { danger: true },
      });
      navigate(HOME_PAGE_ROUTE);
    }
    if (!isLoading && isSuccess) {
      signIn(signInResponse);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return <h1>data</h1>;
}
