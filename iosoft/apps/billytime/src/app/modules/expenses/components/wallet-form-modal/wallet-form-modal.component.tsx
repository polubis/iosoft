import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { WalletFormComponent, WalletFormComponentProps } from '../wallet-form';

export interface WalletFormModalComponentProps
  extends WalletFormComponentProps {
  header: string;
  onClose: () => void;
}

export const WalletFormModalComponent = ({
  header,
  onClose,
  ...formProps
}: WalletFormModalComponentProps) => {
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
        <WalletFormComponent {...formProps} />
      </DialogContent>
    </Dialog>
  );
};
