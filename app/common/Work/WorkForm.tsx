import { Work, WorkPayload } from "@/app/models/work";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../form/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import AutocompleteField from "../form/AutoCompleteField";
import useTagList from "@/app/hooks/use-tag-list";
import PhotoField from "../form/PhotoField";

export interface IWorkFormProps {
  onSubmit?: (payload: Partial<WorkPayload>) => void;
  defaultValue?: Partial<Work>;
}
export default function WorkForm({ onSubmit, defaultValue }: IWorkFormProps) {
  const schema = yup.object().shape({
    title: yup.string().required("Please enter work title"),
    shortDescription: yup.string().required("Please enter work description"),
    tagList: yup.array().of(yup.string().required()).required().min(1, "Please enter category"),
    thumbnail: yup
      .object()
      .nullable()
      .test((value: any, context) => {
        console.log("value", value);
        if (Boolean(defaultValue?.id) || Boolean(value?.file)) return true;
        return context.createError({ message: "Please select an image." });
      })
      .test("test-size", "Maximum size exceed. Please select another file", (value: any) => {
        const fileSize = value?.file?.size || 0;
        const MAX_SIZE = 3 * 1024 * 1024;
        return fileSize <= MAX_SIZE;
      }),
  });

  const { data } = useTagList({});
  const tagList = data?.data || [];

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<WorkPayload>({
    defaultValues: { title: "", shortDescription: "", tagList: [], thumbnail: null, ...defaultValue },

    resolver: yupResolver(schema) as any,
    mode: "onChange",
  });
  async function handleWorkFilterSubmit(value: Partial<WorkPayload>) {
    console.log("value", value);

    // await onSubmit?.(value);
  }

  return (
    <Box component={"form"} onSubmit={handleSubmit(handleWorkFilterSubmit)}>
      <InputField name="title" control={control} placeholder="Your work title" disabled={isSubmitting} label="Title" />
      <InputField
        label="Short description"
        name="shortDescription"
        control={control}
        placeholder="Your short description"
        disabled={isSubmitting}
        InputProps={{
          multiline: true,
          rows: 3,
        }}
      />
      <AutocompleteField
        options={tagList}
        isOptionEqualToValue={(option, value) => option === value}
        getOptionLabel={(option) => {
          return option;
        }}
        control={control}
        name="tagList"
        label="Categories"
        placeholder="Your categrories"
      />

      <PhotoField name="thumbnail" control={control} label={"Thumbnail"} initialImage={defaultValue?.thumbnailUrl} />
      <Button variant="contained" type="submit">
        {defaultValue?.id ? "Save" : "Submit"}
      </Button>
    </Box>
  );
}
