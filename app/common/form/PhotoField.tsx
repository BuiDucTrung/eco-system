import { Box, FormHelperText, TextFieldProps, Typography } from "@mui/material";
import Image from "next/image";
import { ChangeEvent } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { DEFAULT_THUMBNAIL_URL } from "../constants/common";

export type PhotoFieldProps<T extends FieldValues> = TextFieldProps & {
  name: Path<T>;
  control: Control<T>;
  initialImage?: string;
};

export default function PhotoField<T extends FieldValues>({ name, label, control, initialImage }: PhotoFieldProps<T>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control });

  const previewUrl = value?.previewUrl || initialImage || DEFAULT_THUMBNAIL_URL;

  const handleFileChange: any = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return null;
    const url = URL.createObjectURL(file);
    onChange({ file, previewUrl: url });
  };
  return (
    <Box>
      <Typography variant="body2">{label || ""}</Typography>
      <Box component={"label"} htmlFor={"photo-field"} sx={{ cursor: "pointer" }} ref={ref}>
        <Image src={previewUrl} width={246} height={180} layout="fix" alt="thumbnail" />
      </Box>
      <FormHelperText error={!!error}>{error?.message}</FormHelperText>
      <Box component={"input"} type="file" accept="image/*" onChange={handleFileChange} id={"photo-field"} display={"none"}></Box>
    </Box>
  );
}
