import { useDispatch, useSelector } from "react-redux";
import { setSignIn, setSignOut } from "store/slices/userSlice";
import { RootState } from "store/store";

const useAuth = () => {
  const { email, role } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const signIn = (navigateTo: () => void) => {
    dispatch(
      setSignIn({
        email: "test",
        role: "test",
      })
    );

    navigateTo();
  };

  const signOut = () => {
    dispatch(
      setSignOut({
        email: undefined,
        role: undefined,
      })
    );
  };

  return { email, role, signIn, signOut };
};

export default useAuth;
