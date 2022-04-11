import { CURRENCY_DICTIONARY, WalletFormData } from '@iosoft/billytime-core';
import Stack from '@mui/material/Stack';
import { useVo, required, minLength, maxLength } from '@iosoft/vo';
import { TextField, SelectField, Btn } from 'apps/billytime/src/app/ui';
import { FormEvent } from 'react';

export interface WalletFormComponentProps {
  data: WalletFormData;
  disabled?: boolean;
  onSubmit: (data: WalletFormData) => void;
}

export const WalletFormComponent = ({
  data,
  disabled,
  onSubmit,
}: WalletFormComponentProps) => {
  const vo = useVo(data, {
    name: [required(), minLength(3), maxLength(60)],
    description: [minLength(3), maxLength(100)],
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(vo.result.values);
  };

  return (
    <Stack
      component="form"
      noValidate
      spacing={3}
      sx={{ width: 350, padding: '20px 0' }}
      onSubmit={handleSubmit}
    >
      <TextField<WalletFormData> id="name" required {...vo} />
      <TextField<WalletFormData> id="description" {...vo} />
      <TextField<WalletFormData> type="color" required id="color" {...vo} />
      <SelectField<WalletFormData>
        id="currency"
        required
        items={CURRENCY_DICTIONARY}
        {...vo}
      />
      <Btn.Primary disabled={vo.result.invalid || disabled} type="submit">
        Submit
      </Btn.Primary>
    </Stack>
  );
};
