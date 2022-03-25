import { Result } from '@iosoft/vo';
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material/TextField';
import { ChangeEvent } from 'react';
import { capitalize } from '../../utils';

interface TextFieldProps<T extends Record<string, any>> {
  id: keyof T;
  required?: boolean;
  type?: MuiTextFieldProps['type'];
  result: Result<T>;
  onChange: (id: keyof T, value: T[keyof T]) => void;
}

const getProps = (id: string, result: Result<any>) => {
  return {
    name: id,
    id: id,
    error: result.errors[id].invalid,
    helperText: result.errors[id].message || undefined,
    value: result.values[id],
    label: capitalize(id),
  };
};

export const TextField = <T extends Record<string, any>>({
  id,
  result,
  required,
  type,
  onChange,
}: TextFieldProps<T>) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      onChange(e.target.name as keyof T, +e.target.value as T[keyof T]);
      return;
    }

    onChange(e.target.name as keyof T, e.target.value as T[keyof T]);
  };

  return (
    <MuiTextField
      {...getProps(id as string, result)}
      type={type}
      fullWidth
      sx={{ minWidth: 200 }}
      required={required}
      onChange={handleChange}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};
