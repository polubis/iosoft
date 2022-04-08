import { Id, WalletFormData } from '@iosoft/billytime-core';
import {
  useAppDispatch,
  useAppSelector,
  selectWalletFormDataStatuses,
  createWallet,
  editWallet,
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
    dispatch(isEditMode ? editWallet({ data, id }) : createWallet(data));
  };

  const disabled =
    creationStatus.type === 'Pending' || editStatus.type === 'Pending';

  const handleClose = () => {
    disabled || onClose();
  };

  return (
    <WalletFormModalComponent
      data={data}
      disabled={
        creationStatus.type === 'Pending' || editStatus.type === 'Pending'
      }
      header={isEditMode ? `Edit wallet ${data.name}` : 'Create new wallet'}
      onSubmit={handleSubmit}
      onClose={handleClose}
    />
  );
};
