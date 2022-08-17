import { useDispatch, useSelector } from "react-redux";
import { SignInResponse } from "services/auth/signIn";
import { setSignIn, setSignOut } from "store/slices/userSlice";
import { RootState, userPersistor } from "store/store";

const useAuth = () => {
  const { authToken, email, id } = useSelector(
    (state: RootState) => state.user
  );

  const dispatch = useDispatch();

  const signIn = (res: SignInResponse) => {
    // Requesting authToken to the backend and saving it
    // in localStorage with Redux Persist

    dispatch(
      setSignIn({
        authToken: res.token,
        email: res.email,
        id: res.id,
      })
    );
  };

  const signOut = async () => {
    dispatch(
      setSignOut({
        authToken: undefined,
        email: undefined,
        id: undefined,
      })
    );

    await userPersistor.purge();
  };

  return { authToken, email, id, signIn, signOut };
};

export default useAuth;
