import { Box, FormHelperText, TextFieldProps, Typography } from "@mui/material";
import { Control, FieldValues, Path, useController } from "react-hook-form";

export type PhotoFieldProps<T extends FieldValues> = TextFieldProps & {
  name: Path<T>;
  control: Control<T>;
};

export default function PhotoField<T extends FieldValues>({ name, label, control }: PhotoFieldProps<T>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <Box>
      <Typography variant="body2">{label || ""}</Typography>

      <FormHelperText error={!!error}>{error?.message}</FormHelperText>
    </Box>
  );
}
