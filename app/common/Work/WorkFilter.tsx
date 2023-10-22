import { WorkFilterPayload } from "@/app/models/work";
import { Search } from "@mui/icons-material";
import { Box, InputAdornment } from "@mui/material";
import { debounce } from "@mui/material/utils";
import { useEffect } from "react";
import { useForm, Path } from "react-hook-form";
import InputField from "../form/InputField";
import AutocompleteField from "../form/AutoCompleteField";

export interface IWorkFilterFormProps {
  onSubmit?: (payload: WorkFilterPayload) => void;
  defaultValue?: Partial<WorkFilterPayload>;
}
const dataFilter: Array<{ title: string; key: string; search: string }> = [
  { title: "1", key: "1", search: "1" },
  { title: "2", key: "2", search: "2" },
];
export default function WorkFilter({ onSubmit, defaultValue }: IWorkFilterFormProps) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<WorkFilterPayload>({
    defaultValues: {
      title_like: "",
    },

    mode: "onChange",
  });

  useEffect(() => {
    for (const param in defaultValue) {
      setValue(param as Path<WorkFilterPayload>, defaultValue[param as keyof typeof defaultValue] || "");
    }
  }, []);

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
      {/* <AutocompleteField
        options={dataFilter}
        isOptionEqualToValue={(option, value) => option.key === value.key}
        getOptionLabel={(option) => {
          return typeof option === "string" ? option : option.key;
        }}
        control={control}
        name="selectedTagList"
        label="Fillter by category"
        placeholder="fillter by category"
      /> */}
    </Box>
  );
}
