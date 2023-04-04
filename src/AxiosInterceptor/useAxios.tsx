import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/authSlice";
import { RootState } from "../redux/redux";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

export interface DecodedAccessTokenDataType {
  token_type: string;
  exp: number;
  jti: string;
  user_id: number;
  email: string;
  is_staff: boolean;
  is_superuser: boolean;
}

export const useAxios = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state: RootState) => state.auth);

  const axiosInstance = axios.create({
    headers: {
      Authorization: `JWT ${token?.access}`,
    },
  });

  axiosInstance.interceptors.request.use(async (request: any): Promise<any> => {
    const decodedAccessToken: DecodedAccessTokenDataType = jwt_decode(
      token?.access!
    );
    const expTime: number = decodedAccessToken.exp * 1000;
    const timeRemaining = (expTime - new Date().getTime()) / 1000;
    const isExpired = timeRemaining < 20;

    if (!isExpired) return request;

    try {
      const response = await axios({
        url: process.env.REACT_APP_BASE_URL! + "/auth/jwt/refresh/",
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
      return toast.error(
        "You are inactive for too long, so you're logged out of the system."
      );
    }
    return request;
  });

  return { axiosInstance };
};
