import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PasswordIcon from "@mui/icons-material/Password";

export const LoginInputField = [
  {
    id: "email",
    name: "email",
    label: "Email Address",
    type: "email",
    startIcon: <AlternateEmailIcon />,
    endIcon: <></>,
    endIconSwap: <></>,
    required: true,
    autoFocus: true,
  },
  {
    id: "password",
    name: "password",
    label: "Password",
    type: "password",
    startIcon: <PasswordIcon />,
    endIcon: <VisibilityIcon />,
    endIconSwap: <VisibilityOffIcon />,
    required: true,
  },
];
