import { useDispatch, useSelector } from "react-redux";
import { AuthResponse, useLogOutMutation } from "services/auth/setAuthAPI";
import { setSignOut, setUser } from "store/slices/userSlice";
import { RootState, userPersistor } from "store/store";
import { useSocketDisconnectMutation } from "services/notifications/setNotificationsAPI";

const useAuth = () => {
  const [runLogOut] = useLogOutMutation();
  const [disconnectFromSocket] = useSocketDisconnectMutation();

  const { authToken, email, role } = useSelector(
    (state: RootState) => state.user
  );

  const dispatch = useDispatch();

  const signIn = (res: AuthResponse) => {
    // Saving in localStorage with Redux Persist
    const { accessToken, refreshToken } = res;
    dispatch(
      setUser({
        authToken: accessToken.authToken,
        email: accessToken.email,
        role: accessToken.role,
        refreshToken,
      })
    );
  };

  const signOut = async () => {
    await disconnectFromSocket();
    await runLogOut();
    dispatch(setSignOut());

    await userPersistor.purge();
  };

  return { authToken, email, role, signIn, signOut };
};

export default useAuth;
