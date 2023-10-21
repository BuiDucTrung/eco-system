import { WorkFilterPayload } from "@/app/models/work";
import { Search } from "@mui/icons-material";
import { Box, InputAdornment } from "@mui/material";
import { debounce } from "@mui/material/utils";
import * as React from "react";
import { useForm } from "react-hook-form";
import InputField from "../form/InputField";

export interface IWorkFilterFormProps {
  onSubmit?: (payload: WorkFilterPayload) => void;
}

export default function WorkFilter({ onSubmit }: IWorkFilterFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<WorkFilterPayload>({
    defaultValues: {
      title_like: "",
    },

    mode: "onChange",
  });

  const debounceSearchChange = debounce(handleSubmit(handleWorkFilterSubmit), 350);

  async function handleWorkFilterSubmit(value: WorkFilterPayload) {
    await onSubmit?.(value);
    console.log("form submit", value);
  }

  return (
    <Box component={"form"}>
      <InputField
        name="title_like"
        control={control}
        placeholder="Search work by title"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          console.log("change", event.target.value);
          debounceSearchChange();
        }}
      />
    </Box>
  );
}
