import { Id, WalletFormData } from '@iosoft/billytime-core';
import { isPendingState } from '@iosoft/sm';
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
  header?: string;
}

export const WalletFormModalContainer = ({
  data,
  id,
  header,
  onClose,
}: WalletFormModalContainerProps) => {
  const dispatch = useAppDispatch();
  const [creationStatus, editStatus] = useAppSelector(
    selectWalletFormDataStatuses
  );
  const isEditMode = id !== -1;
  const disabled =
    creationStatus.type === 'Pending' || editStatus.type === 'Pending';

  const handleSubmit = (data: WalletFormData) => {
    dispatch(isEditMode ? editWallet({ data, id }) : createWallet(data));
  };

  const handleClose = () => {
    disabled || onClose();
  };

  return (
    <WalletFormModalComponent
      data={data}
      disabled={disabled}
      header={
        header ??
        (isEditMode ? `Edit wallet ${data.name}` : 'Create new wallet')
      }
      onSubmit={handleSubmit}
      onClose={handleClose}
    />
  );
};
