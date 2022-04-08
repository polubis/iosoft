import CircularProgress from '@mui/material/CircularProgress';
import {
  useAppSelector,
  selectWallets,
  selectWalletCreationStatus,
} from '../../../store';
import { useState } from 'react';
import { CheckedItems, WalletsGridComponent } from '../components';
import {
  CURRENCY_DICTIONARY,
  Wallet,
  WalletFormData,
} from '@iosoft/billytime-core';
import { useFormModal } from 'apps/billytime/src/app/utils';
import { WalletFormModalContainer } from './wallet-form-modal.container';

const useCheckedWallets = () => {
  const [checkedWallets, setCheckedWallets] = useState<CheckedItems>({});

  const handleSetCheckedWallet = (wallet: Wallet) => {
    setCheckedWallets((prevWallets) => ({
      ...prevWallets,
      [wallet.id]: prevWallets[wallet.id] ? false : true,
    }));
  };

  return [checkedWallets, handleSetCheckedWallet] as const;
};

export const WalletsContainer = () => {
  const wallets = useAppSelector(selectWallets);
  const walletCreationStatus = useAppSelector(selectWalletCreationStatus);
  const [checkedWallets, handleSetCheckedWallet] = useCheckedWallets();
  const { openForCreate, openForEdit, close, formModalData, formModalId } =
    useFormModal<WalletFormData>();

  if (wallets.type === 'Pending') {
    return <CircularProgress />;
  }

  if (wallets.type === 'Done') {
    return (
      <>
        {formModalData && (
          <WalletFormModalContainer
            data={formModalData}
            id={formModalId}
            disabled={walletCreationStatus.type === 'Pending'}
            onClose={close}
          />
        )}
        <WalletsGridComponent
          data={wallets.data}
          checkedItems={checkedWallets}
          onItemSelect={handleSetCheckedWallet}
          onCreateWalletClick={() =>
            openForCreate({
              name: '',
              description: '',
              color: '#000',
              currency: CURRENCY_DICTIONARY[0].value,
            })
          }
        />
      </>
    );
  }

  return null;
};
