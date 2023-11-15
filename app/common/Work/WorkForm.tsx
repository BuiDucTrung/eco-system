import useTagList from "@/app/hooks/use-tag-list";
import { WorkPayload } from "@/app/models/work";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import AutocompleteField from "../form/AutoCompleteField";
import EditorField from "../form/EditorField";
import InputField from "../form/InputField";
import PhotoField from "../form/PhotoField";

export interface IWorkFormProps {
  onSubmit?: (payload: FormData) => void;
  defaultValue?: Partial<WorkPayload>;
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
    defaultValues: { title: "", shortDescription: "", tagList: [], thumbnail: null, fullDescription: "", ...defaultValue },

    resolver: yupResolver(schema) as any,
    mode: "onChange",
  });
  async function handleWorkFormSubmit(formValue: Partial<WorkPayload>) {
    const payload = new FormData();
    formValue.id && payload.set("id", formValue.id);
    formValue.thumbnail?.file && payload.set("thumbnail", formValue.thumbnail?.file);
    formValue.tagList?.forEach((tag) => {
      payload.append("tagList", tag);
    });

    const keyList: Array<keyof Partial<WorkPayload>> = ["title", "fullDescription", "shortDescription"];
    keyList.forEach((name) => {
      if (defaultValue?.[name] !== formValue?.[name]) payload.set(name, formValue?.[name] as string);
    });
    console.log("payload", payload);
    await onSubmit?.(payload);
  }

  return (
    <Box component={"form"} onSubmit={handleSubmit(handleWorkFormSubmit)}>
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
      <EditorField name="fullDescription" control={control} label="Full Description" />
      <PhotoField name="thumbnail" control={control} label={"Thumbnail"} initialImage={defaultValue?.thumbnailUrl} />
      <Button variant="contained" type="submit">
        {defaultValue?.id ? "Save" : "Submit"}
      </Button>
    </Box>
  );
}
