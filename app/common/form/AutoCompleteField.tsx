import { Autocomplete, AutocompleteProps, Box, Checkbox, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export type AutocompleteFieldProps<T, K extends FieldValues> = Partial<AutocompleteProps<T, boolean, boolean, boolean>> & {
  name: Path<K>;
  control: Control<K>;
  placeholder?: string;
  label?: string;
  options: T[];
  getOptionLabel: (option: T) => string;
};

export default function AutocompleteField<T, K extends FieldValues>({
  name,
  label,
  control,
  placeholder,
  options,
  getOptionLabel,
  isOptionEqualToValue,
  // onChange: externalOnChange,
  // onBlur: externalOnBlur,
  // inputRef: externalRef,
  ...rest
}: AutocompleteFieldProps<T, K>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control });

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <Autocomplete
      multiple
      fullWidth
      size="small"
      options={options}
      disableCloseOnSelect
      isOptionEqualToValue={isOptionEqualToValue}
      getOptionLabel={getOptionLabel}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
          {getOptionLabel(option) || "-"}
        </li>
      )}
      renderInput={(params) => <TextField {...params} label={label} placeholder={placeholder} />}
    />
  );
}
