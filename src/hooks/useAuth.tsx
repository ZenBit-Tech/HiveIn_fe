import { useDispatch, useSelector } from "react-redux";
import { AuthResponse } from "services/auth/setAuthAPI";
import { setSignOut, setUser } from "store/slices/userSlice";
import { RootState, userPersistor } from "store/store";

const useAuth = () => {
  const { authToken, email, role } = useSelector(
    (state: RootState) => state.user
  );

  const dispatch = useDispatch();

  const signIn = (res: AuthResponse) => {
    // Saving in localStorage with Redux Persist
    dispatch(
      setUser({
        authToken: res.token,
        email: res.email,
        role: res.role,
      })
    );
  };

  const signOut = async () => {
    dispatch(setSignOut());

    await userPersistor.purge();
  };

  return { authToken, email, role, signIn, signOut };
};

export default useAuth;
