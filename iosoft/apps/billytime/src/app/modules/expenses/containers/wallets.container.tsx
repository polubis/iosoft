import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector, selectWallets } from '../../../store';
import { useState } from 'react';
import {
  CheckedItems,
  WalletsGridComponent,
  WalletFormModalComponent,
} from '../components';
import {
  CURRENCY_DICTIONARY,
  Wallet,
  WalletFormData,
} from '@iosoft/billytime-core';
import { useFormModal } from 'apps/billytime/src/app/utils';

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
  const [checkedWallets, handleSetCheckedWallet] = useCheckedWallets();
  const {
    openForCreate,
    openForEdit,
    close,
    isEditMode,
    formModalData,
    formModalId,
  } = useFormModal<WalletFormData>();

  const handleSubmit = () => {};

  if (wallets.type === 'Pending') {
    return <CircularProgress />;
  }

  if (wallets.type === 'Done') {
    return (
      <>
        {formModalData && (
          <WalletFormModalComponent
            data={formModalData}
            disabled={false}
            header={
              isEditMode
                ? `Edit wallet ${formModalData.name}`
                : 'Create new wallet'
            }
            onSubmit={handleSubmit}
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
