import { Id, WalletFormData } from '@iosoft/billytime-core';
import { isBusy } from '@iosoft/sm';
import { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
  walletsActions,
  selectWalletsStep,
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
  const walletsStep = useAppSelector(selectWalletsStep);
  const isEditMode = id !== -1;
  const disabled = isBusy(walletsStep);

  const handleSubmit = (data: WalletFormData) => {
    dispatch(
      isEditMode
        ? walletsActions.editing({ data, id })
        : walletsActions.creating(data)
    );
  };

  const handleClose = () => {
    disabled || onClose();
  };

  useEffect(() => {
    (walletsStep === 'created' || walletsStep === 'edited') && handleClose();
  }, [walletsStep]);

  return (
    <Modal
      header={
        header ??
        (isEditMode ? `Edit wallet ${data.name}` : 'Create new wallet')
      }
      onClose={handleClose}
    >
      <WalletFormComponent
        data={data}
        disabled={disabled}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};
