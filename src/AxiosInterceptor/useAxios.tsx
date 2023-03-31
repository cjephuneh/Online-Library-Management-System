// import React from "react";
import axios from "axios";
// import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import { RootState } from "../redux/redux";
// import { authActions } from "../redux/authSlice";

export const useAxios = () => {
  // const dispatch = useDispatch();

  const { token } = useSelector((state: RootState) => state.auth);

  const axiosInstance = axios.create({
    headers: {
      Authorization: `JWT ${token?.access}`,
    },
  });

  //   axiosInstance.interceptors.request.use(async (request) => {
  //     // const tokenExprire = jwt_decode(token?.access);
  //     // const isExpired = new Date().getTime() - tokenExprire > -20;

  //     // if (!isExpired) return request;

  //     try {
  //       const response = await axios({
  //         method: "POST",
  //         url: process.env.REACT_APP_BASE_URL! + "/jwt/create",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         data: {
  //           refresh: token?.refresh,
  //         },
  //       });

  //       request.headers.Authorization = `JWT ${response.data.access}`;
  //       dispatch(authActions.updateToken(response.data));
  //       return request;
  //     } catch (error) {
  //       return;
  //     }
  //   });

  return { axiosInstance };
  //
};
