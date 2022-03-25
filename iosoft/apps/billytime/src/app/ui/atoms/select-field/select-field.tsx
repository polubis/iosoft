import { Result } from '@iosoft/vo';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { capitalize } from '../../utils';
import { LabelValueItem } from '../../models';

interface SelectFieldProps<T extends Record<string, any>> {
  id: keyof T;
  result: Result<T>;
  items: LabelValueItem[];
  onChange: (id: keyof T, value: T[keyof T]) => void;
}

export const SelectField = <T extends Record<string, any>>({
  id,
  result,
  items,
  onChange,
}: SelectFieldProps<T>) => {
  const selectId = id as string;

  const handleChange = (e: SelectChangeEvent<unknown>) => {
    onChange(e.target.name as keyof T, e.target.value as T[keyof T]);
  };

  const label = capitalize(selectId);

  return (
    <FormControl sx={{ minWidth: 200 }} fullWidth error={result.errors[id].invalid}>
      <InputLabel id={selectId}>{label}</InputLabel>
      <Select
        name={selectId}
        id={selectId}
        labelId={selectId}
        label={label}
        value={result.values[id]}
        onChange={handleChange}
      >
        {items.map(({ label, value }, idx) => (
          <MenuItem key={label + idx} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>

      {result.errors[id].invalid && (
        <FormHelperText>{result.errors[id].message}</FormHelperText>
      )}
    </FormControl>
  );
};
