import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { ReactNode } from 'react';

export interface ModalProps {
  header: string;
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({ header, children, onClose }: ModalProps) => {
  return (
    <Dialog
      open
      sx={{ minWidth: 425 }}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{header}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
