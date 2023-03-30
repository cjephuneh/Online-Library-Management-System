import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PasswordIcon from "@mui/icons-material/Password";
import BadgeIcon from "@mui/icons-material/Badge";

export const RegisterInputField = [
  {
    id: "fname",
    name: "fname",
    label: "Full Name",
    type: "text",
    startIcon: <BadgeIcon />,
    endIcon: <></>,
    endIconSwap: <></>,
    required: true,
    autoFocus: true,
  },
  {
    id: "email",
    name: "email",
    label: "Email Address",
    type: "email",
    startIcon: <AlternateEmailIcon />,
    endIcon: <></>,
    endIconSwap: <></>,
    required: true,
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
  {
    id: "password2",
    name: "password2",
    label: "Confirm Password",
    type: "password",
    startIcon: <PasswordIcon />,
    endIcon: <VisibilityIcon />,
    endIconSwap: <VisibilityOffIcon />,
    required: true,
  },
];
