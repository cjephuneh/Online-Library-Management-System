import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { authActions } from "../redux/authSlice";

export const useLogout = () => {
  const dispatch = useDispatch();

  const sendLogoutRequest = () => {
    dispatch(authActions.deleteToken());
    toast.success("Logged out successfully!");
  };

  return { sendLogoutRequest };
};
