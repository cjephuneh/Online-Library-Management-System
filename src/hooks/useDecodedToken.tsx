import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

import { RootState } from "../redux/redux";
import { DecodedAccessTokenDataType } from "../AxiosInterceptor/useAxios";

export const useDecodedToken = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  let currentEmail = "@@@@@@@@@@@@@@@@@@@@@@";
  let is_staff = false;
  let is_superuser = false;

  if (token) {
    const decodedToken: DecodedAccessTokenDataType = jwt_decode(token.access);

    currentEmail = decodedToken.email;
    is_staff = decodedToken.is_staff;
    is_superuser = decodedToken.is_superuser;
  }

  return { token, currentEmail, is_staff, is_superuser };
};
