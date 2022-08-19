import { useDispatch, useSelector } from "react-redux";
import { AuthResponse } from "services/auth/setAuthAPI";
import { setSignIn, setSignOut } from "store/slices/userSlice";
import { RootState, userPersistor } from "store/store";

const useAuth = () => {
  const { authToken, email, id, role } = useSelector(
    (state: RootState) => state.user
  );

  const dispatch = useDispatch();

  const signIn = (res: AuthResponse) => {
    // Requesting authToken to the backend and saving it
    // in localStorage with Redux Persist

    dispatch(
      setSignIn({
        authToken: res.token,
        email: res.email,
        id: res.id,
        role: res.role,
      })
    );
  };

  const signOut = async () => {
    dispatch(setSignOut());

    await userPersistor.purge();
  };

  return { authToken, email, id, role, signIn, signOut };
};

export default useAuth;
