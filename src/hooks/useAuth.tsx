import { useDispatch, useSelector } from "react-redux";
import { setSignIn, setSignOut } from "store/slices/userSlice";
import { RootState, userPersistor } from "store/store";

const useAuth = () => {
  const { authToken, email, role } = useSelector(
    (state: RootState) => state.user
  );

  const dispatch = useDispatch();

  const signIn = (token: string) => {
    // Requesting authToken to the backend and saving it
    // in localStorage with Redux Persist
    dispatch(
      setSignIn({
        authToken: token,
        email: "test",
        role: "test",
      })
    );
  };

  const signOut = async () => {
    dispatch(
      setSignOut({
        authToken: undefined,
        email: undefined,
        role: undefined,
      })
    );

    await userPersistor.purge();
  };

  return { authToken, email, role, signIn, signOut };
};

export default useAuth;
