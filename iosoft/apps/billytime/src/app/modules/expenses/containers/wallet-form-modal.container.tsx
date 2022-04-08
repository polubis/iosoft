import { Id, WalletFormData } from '@iosoft/billytime-core';
import { isDoneState } from '@iosoft/sm';
import { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
  selectWalletFormDataStatuses,
  createWallet,
} from '../../../store';
import {
  WalletFormModalComponent,
  WalletFormModalComponentProps,
} from '../components';

interface WalletFormModalContainerProps
  extends Omit<WalletFormModalComponentProps, 'header' | 'onSubmit'> {
  id: Id;
}

export const WalletFormModalContainer = ({
  data,
  id,
  onClose,
}: WalletFormModalContainerProps) => {
  const [creationStatus, editStatus] = useAppSelector(
    selectWalletFormDataStatuses
  );
  const dispatch = useAppDispatch();

  const isEditMode = id !== -1;

  const handleSubmit = (data: WalletFormData) => {
    if (isEditMode) {
      return;
    }

    dispatch(createWallet(data));
  };

  useEffect(() => {
    if (isDoneState(creationStatus) || isDoneState(editStatus)) {
      onClose();
    }
  }, [creationStatus]);

  return (
    <WalletFormModalComponent
      data={data}
      disabled={
        creationStatus.type === 'Pending' || editStatus.type === 'Pending'
      }
      header={isEditMode ? `Edit wallet ${data.name}` : 'Create new wallet'}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
};
