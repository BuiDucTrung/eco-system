import { WorkFilterPayload } from "@/app/models/work";
import { Search } from "@mui/icons-material";
import { Box, InputAdornment } from "@mui/material";
import { debounce } from "@mui/material/utils";
import { useEffect } from "react";
import { useForm, Path } from "react-hook-form";
import InputField from "../form/InputField";
import AutocompleteField from "../form/AutoCompleteField";
import useTagList from "@/app/hooks/use-tag-list";

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
      title_like: "",
      selectedTagList: [],
      ...defaultValue,
    },

    mode: "onChange",
  });

  const { data: tagList, isLoading } = useTagList({});

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
      {!isLoading && (
        <AutocompleteField
          options={tagList?.data}
          isOptionEqualToValue={(option, value) => option === value}
          getOptionLabel={(option) => {
            return option;
          }}
          control={control}
          name="selectedTagList"
          label="Fillter by category"
          placeholder="fillter by category"
          onChange={() => debounceSearchChange()}
        />
      )}
    </Box>
  );
}
