import { Id, WalletFormData } from '@iosoft/billytime-core';
import {
  useAppDispatch,
  useAppSelector,
  selectWalletFormDataStatuses,
  createWallet,
  editWallet,
} from '../../../store';
import { Modal, ModalProps } from '../../../ui';
import { WalletFormComponent, WalletFormComponentProps } from '../components';

interface WalletFormModalContainerProps {
  id: Id;
  data: WalletFormComponentProps['data'];
  disabled?: WalletFormComponentProps['disabled'];
  header?: ModalProps['header'];
  onClose: ModalProps['onClose'];
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
    <Modal
      header={
        header ??
        (isEditMode ? `Edit wallet ${data.name}` : 'Create new wallet')
      }
      onClose={handleClose}
    >
      <WalletFormComponent data={data} onSubmit={handleSubmit} />
    </Modal>
  );
};
