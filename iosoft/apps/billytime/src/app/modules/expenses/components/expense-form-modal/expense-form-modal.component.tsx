import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import {
  ExpenseFormComponent,
  ExpenseFormComponentProps,
} from '../expense-form';

interface ExpenseFormModalComponentProps extends ExpenseFormComponentProps {
  header: string;
  onClose: () => void;
}

export const ExpenseFormModalComponent = ({
  header,
  onClose,
  ...formProps
}: ExpenseFormModalComponentProps) => {
  return (
    <Dialog
      open
      sx={{ minWidth: 450 }}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{header}</DialogTitle>
      <DialogContent>
        <ExpenseFormComponent {...formProps} />
      </DialogContent>
    </Dialog>
  );
};
