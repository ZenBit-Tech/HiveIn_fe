import useAuth from "hooks/useAuth";
import jwtDecode, { JwtPayload } from "jwt-decode";

const useJwtDecoder = () => {
  const { authToken } = useAuth();

  if (authToken) {
    const { sub, exp } = jwtDecode<JwtPayload>(authToken);

    return { sub, exp };
  }

  return { sub: "0", exp: "0" };
};

export default useJwtDecoder;
