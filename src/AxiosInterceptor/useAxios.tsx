import axios, { InternalAxiosRequestConfig } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/authSlice";
import { RootState } from "../redux/redux";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

export const useAxios = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state: RootState) => state.auth);

  const axiosInstance = axios.create();

  axiosInstance.interceptors.request.use(
    async (request: InternalAxiosRequestConfig) => {
      const expTime: number = +jwt_decode(token?.access!)! * 1000;
      const isExpired = expTime - new Date().getTime() < 20;

      request.headers.Authorization = `JWT ${token?.access}`;
      if (!isExpired) return request;

      try {
        const response = await axios({
          url: process.env.REACT_APP_BASE_URL! + "/auth/jwt/create/",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            refresh: token?.refresh,
          },
        });

        dispatch(authActions.updateToken(response.data));
        request.headers.Authorization = `JWT ${response.data.access}`;
      } catch (error) {
        dispatch(authActions.deleteToken());
        toast.error("Something went wrong! You're logged out of the system.");
      }

      return request;
    }
  );

  return { axiosInstance };
};
