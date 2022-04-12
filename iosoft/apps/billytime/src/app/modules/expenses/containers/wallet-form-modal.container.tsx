import { WalletFormData } from '@iosoft/billytime-core';
import { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
  walletAction,
  walletSelector,
} from '../../../store';
import { Modal } from '../../../ui';
import { WalletFormComponent } from '../components';

export const WalletFormModalContainer = () => {
  const dispatch = useAppDispatch();
  const walletStep = useAppSelector(walletSelector.step);
  const walletData = useAppSelector(walletSelector.data);
  const id = useAppSelector(walletSelector.idToEdit);
  const isEditMode = id !== -1;
  const disabled = walletStep === 'creating' || walletStep === 'editing';

  const handleSubmit = (data: WalletFormData) => {
    dispatch(
      isEditMode
        ? walletAction.editing({ data, id })
        : walletAction.creating(data)
    );
  };

  const handleClose = () => {
    disabled || dispatch(walletAction.idle());
  };

  useEffect(() => {
    return () => {
      dispatch(walletAction.idle());
    };
  }, []);

  if (!walletData) {
    return null;
  }

  return (
    <Modal
      header={
        isEditMode ? `Edit wallet ${walletData.name}` : 'Create new wallet'
      }
      onClose={handleClose}
    >
      <WalletFormComponent
        data={walletData}
        disabled={disabled}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};
