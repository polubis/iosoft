import {
  ExpenseFormData,
  EXPENSE_CATEGORIES_DICTIONARY,
  CURRENCY_DICTIONARY,
} from '@iosoft/billytime-core';
import Stack from '@mui/material/Stack';
import { useVo, required, minLength, maxLength, min } from '@iosoft/vo';
import { TextField, SelectField, Btn } from 'apps/billytime/src/app/ui';
import { FormEvent } from 'react';

export interface ExpenseFormComponentProps {
  data: ExpenseFormData;
  disabled?: boolean;
  onSubmit: (data: ExpenseFormData) => void;
}

export const ExpenseFormComponent = ({
  data,
  disabled,
  onSubmit,
}: ExpenseFormComponentProps) => {
  const vo = useVo(data, {
    name: [required(), minLength(3), maxLength(20)],
    description: [minLength(3), maxLength(20)],
    cost: [min(0.01)],
    currency: [required()],
    category: [required()],
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
      <TextField<ExpenseFormData> id="name" required {...vo} />
      <TextField<ExpenseFormData> id="description" {...vo} />
      <TextField<ExpenseFormData> type="number" required id="cost" {...vo} />
      <TextField<ExpenseFormData> type="date" required id="date" {...vo} />
      <SelectField<ExpenseFormData>
        id="category"
        required
        items={EXPENSE_CATEGORIES_DICTIONARY}
        {...vo}
      />
      <SelectField<ExpenseFormData>
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
