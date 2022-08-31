import useAuth from "hooks/useAuth";
import jwtDecode, { JwtPayload } from "jwt-decode";

const useJwtDecoder = () => {
  const { authToken } = useAuth();

  const { sub, exp } = jwtDecode<JwtPayload>(authToken!);

  return { sub, exp };
};

export default useJwtDecoder;
