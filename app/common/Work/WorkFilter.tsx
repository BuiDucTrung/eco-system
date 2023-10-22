import { WorkFilterPayload } from "@/app/models/work";
import { Search } from "@mui/icons-material";
import { Box, InputAdornment } from "@mui/material";
import { debounce } from "@mui/material/utils";
import * as React from "react";
import { useForm } from "react-hook-form";
import InputField from "../form/InputField";

export interface IWorkFilterFormProps {
  onSubmit?: (payload: WorkFilterPayload) => void;
  defaultValue?: Partial<WorkFilterPayload>;
}

export default function WorkFilter({ onSubmit, defaultValue }: IWorkFilterFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<WorkFilterPayload>({
    defaultValues: {
      ...defaultValue,
    },

    mode: "onChange",
  });

  const debounceSearchChange = debounce(handleSubmit(handleWorkFilterSubmit), 350);

  async function handleWorkFilterSubmit(value: WorkFilterPayload) {
    await onSubmit?.(value);
  }

  return (
    <Box component={"form"}>
      <InputField
        name="title_like"
        control={control}
        placeholder="Search work by title"
        disabled={isSubmitting}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          debounceSearchChange();
        }}
      />
    </Box>
  );
}
