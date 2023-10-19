import { Box, Button, CircularProgress, IconButton, InputAdornment } from "@mui/material";
import * as React from "react";
import { useForm } from "react-hook-form";
import InputField from "../form/InputField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoginPayload } from "@/app/models/login";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export interface ILoginFormProps {
  onSubmit?: (payload: LoginPayload) => void;
}

export default function LoginForm({ onSubmit }: ILoginFormProps) {
  const schema = yup.object().shape({
    username: yup.string().required("Please enter username").min(4, "Username is required to have at least 4 characters"),
    password: yup.string().required("Please enter username").min(5, "Password is required to have at least 6 characters"),
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<LoginPayload>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  async function handleLoginSubmit(value: LoginPayload) {
    await onSubmit?.(value);
    reset();
  }

  return (
    <Box component={"form"} onSubmit={handleSubmit(handleLoginSubmit)}>
      <InputField name="username" control={control} label="User name" />
      <InputField
        name="password"
        control={control}
        type={showPassword ? "text" : "password"}
        label="Password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((pre) => !pre)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        fullWidth
        type="submit"
        disabled={isSubmitting}
        startIcon={isSubmitting ? <CircularProgress sx={{ textAlign: "center" }} color="inherit" size={"1em"} /> : null}
      >
        Login
      </Button>
    </Box>
  );
}
