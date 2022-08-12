import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setSignIn, setSignOut } from "store/slices/userSlice";
import { RootState, userPersistor } from "store/store";

const useAuth = () => {
  const { isAuthenticated, token, email, role } = useSelector(
    (state: RootState) => state.user
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(
        setAuth({
          isAuthenticated: true,
        })
      );
    }
  }, [dispatch, token]);

  const signIn = () => {
    // Requesting token to the backend and saving it
    // in localStorage with Redux Persist
    dispatch(
      setSignIn({
        isAuthenticated: true,
        token: "test",
        email: "test",
        role: "test",
      })
    );
  };

  const signOut = async () => {
    dispatch(
      setSignOut({
        isAuthenticated: false,
        token: undefined,
        email: undefined,
        role: undefined,
      })
    );

    await userPersistor.purge();
  };

  return { isAuthenticated, email, role, signIn, signOut };
};

export default useAuth;
