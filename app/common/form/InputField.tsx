import { Box, TextField, TextFieldProps } from "@mui/material";
import { ChangeEvent } from "react";
import { Control, useController, FieldValues, Path } from "react-hook-form";

export type InputFieldProps<T extends FieldValues> = TextFieldProps & {
  name: Path<T>;
  control: Control<T>;
};

export default function InputField<T extends FieldValues>({
  name,
  label,
  control,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  inputRef: externalRef,
  ...rest
}: InputFieldProps<T>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <TextField
      fullWidth
      size="small"
      margin="normal"
      label={label || ""}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        onChange(event);
        externalOnChange?.(event);
      }}
      inputRef={ref}
      onBlur={onBlur}
      value={value}
      error={!!error}
      helperText={error?.message}
      {...rest}
    />
  );
}
