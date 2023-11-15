"use client";

import { Box, FormHelperText, Skeleton, TextFieldProps, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { DeltaStatic, Sources } from "quill";
import { LegacyRef, useCallback, useEffect, useRef, useState } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import ReactQuill, { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";

export type PhotoFieldProps<T extends FieldValues> = TextFieldProps & {
  name: Path<T>;
  control: Control<T>;
};

const ReactQuillWrapper = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    const Component = ({ forwardRef, ...props }: ReactQuillWrapperProps) => {
      return <RQ ref={forwardRef} {...props} />;
    };
    return Component;
  },
  {
    ssr: false,
  }
);

interface ReactQuillWrapperProps extends ReactQuillProps {
  forwardRef: LegacyRef<ReactQuill>;
}

export default function EditorField<T extends FieldValues>({ name, label, control }: PhotoFieldProps<T>) {
  const quillRef = useRef<any>(null);
  const cloundinaryWidgetRef = useRef<any>(null);
  const [isCloudinaryReady, setIsCloudinaryReady] = useState(false);
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control });
  const imageHandler = useCallback((data: any) => {
    cloundinaryWidgetRef?.current && cloundinaryWidgetRef.current?.open();
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };

  const formats = ["header", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image"];

  const handleChangeEditor = (value: string, _delta: DeltaStatic, _source: Sources, _editor: any) => {
    onChange(value);
  };
  useEffect(() => {
    const initialCloundinary = () => {
      // @ts-ignore
      if (!window.cloudinary) {
        setTimeout(initialCloundinary, 500);
        return;
      }
      // @ts-ignore
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: "djnlwknhu",
          uploadPreset: "eco-system",
          // cropping: true, //add a cropping step
          // showAdvancedOptions: true,  //add advanced options (public_id and tag)
          // sources: [ "local", "url"], // restrict the upload sources to URL and local files
          // multiple: false,  //restrict upload to a single file
          // folder: "user_images", //upload files to the specified folder
          // tags: ["users", "profile"], //add the given tags to the uploaded files
          // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
          // clientAllowedFormats: ["images"], //restrict uploading to image files only
          // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
          // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
          // theme: "purple", //change to a purple theme
        },
        //@ts-ignore
        (error, result) => {
          if (!error && result && result.event === "success") {
            //insertEmbed
            const quill = quillRef.current;
            quill?.getEditor()?.insertEmbed(+quill?.getEditorSelection()?.index || 0, "image", result.info?.secure_url);
          }
        }
      );
      cloundinaryWidgetRef.current = widget;
      setIsCloudinaryReady(() => true);
    };
    initialCloundinary();
  }, []);

  return (
    <Box>
      <Typography variant="body2">{label || ""}</Typography>

      {isCloudinaryReady ? (
        <Box>
          <ReactQuillWrapper theme="snow" modules={modules} formats={formats} onChange={handleChangeEditor} value={value} forwardRef={quillRef} />
        </Box>
      ) : (
        <>
          <Skeleton variant="rectangular" width={"full"} height={50} />
        </>
      )}

      <FormHelperText error={!!error}>{error?.message}</FormHelperText>
    </Box>
  );
}
