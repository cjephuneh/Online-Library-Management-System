import React from "react";
import { useController, useFormContext } from "react-hook-form";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { InputAdornment, TextFieldProps } from "@mui/material";

interface Props extends Omit<TextFieldProps, "name" | "label" | "type"> {
  id: string;
  name: string;
  label: string;
  type: string;
  startIcon: JSX.Element;
  endIcon: JSX.Element;
  endIconSwap: JSX.Element;
}

export const CustomInput: React.FC<Props> = ({
  id,
  name,
  label,
  type,
  startIcon,
  endIcon,
  endIconSwap,
  ...rest
}) => {
  const { control, formState } = useFormContext();
  const { field, fieldState } = useController({ name, control });

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  if (type === "password") {
    if (showPassword) {
      type = "text";
    } else {
      type = "password";
    }
  }

  return (
    <FormControl>
      <TextField
        id={id}
        label={label}
        type={type}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={() => setShowPassword((prevState) => !prevState)}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              {showPassword ? endIconSwap : endIcon}
            </InputAdornment>
          ),
        }}
        {...field}
        {...rest}
        error={!!formState.errors[name]}
        helperText={fieldState.error?.message}
      />
    </FormControl>
  );
};
