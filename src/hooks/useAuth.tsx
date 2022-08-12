import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setSignIn, setSignOut } from "store/slices/userSlice";
import { RootState } from "store/store";

const useAuth = () => {
  const { isAuthenticated, email, role } = useSelector(
    (state: RootState) => state.user
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(
        setAuth({
          isAuthenticated: true,
        })
      );
    }
  }, [dispatch]);

  const signIn = () => {
    // Requesting token to the backend and saving it
    // in localStorage
    localStorage.setItem("token", JSON.stringify("token"));

    dispatch(
      setSignIn({
        isAuthenticated: true,
        email: "test",
        role: "test",
      })
    );
  };

  const signOut = () => {
    localStorage.removeItem("token");

    dispatch(
      setSignOut({
        isAuthenticated: false,
        email: undefined,
        role: undefined,
      })
    );
  };

  return { isAuthenticated, email, role, signIn, signOut };
};

export default useAuth;
