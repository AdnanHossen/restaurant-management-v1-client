import { useEffect } from "react";
import secureApi from "./secureApi";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";

const useSecureInterceptor = () => {
  const { logOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = secureApi.interceptors.response.use(
      (res) => {
        return res;
      },
      async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          await logOutUser();
          navigate("login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      secureApi.interceptors.response.eject(interceptor);
    };
  }, [logOutUser, navigate]);
};

export default useSecureInterceptor;
