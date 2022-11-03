import { useGetWebsocketErrorQuery } from "services/notifications/setNotificationsAPI";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useAuth from "hooks/useAuth";

const useWSError = () => {
  const { authToken } = useAuth();
  const { data, error, isSuccess, isLoading, isError } =
    useGetWebsocketErrorQuery(undefined, {
      skip: !authToken,
    });

  useEffect(() => {
    if (data?.message && isSuccess && !isLoading) {
      toast.error(data.message);
    }
    if (error && isError && !isLoading) {
      if ("message" in error) {
        toast.error(error.message);
      }
    }
  }, [data, error, isError, isLoading, isSuccess]);
};
export default useWSError;
