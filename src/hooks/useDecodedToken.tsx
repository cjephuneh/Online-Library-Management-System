import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

import { RootState } from "../redux/redux";
import { DecodedAccessTokenDataType } from "../AxiosInterceptor/useAxios";

export const useDecodedToken = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  let currentEmail = "@@@@@@@@@@@@@@@@@@@@@@";

  if (token) {
    const decodedToken: DecodedAccessTokenDataType = jwt_decode(token.access);

    currentEmail = decodedToken.email;
  }

  return { currentEmail };
};
