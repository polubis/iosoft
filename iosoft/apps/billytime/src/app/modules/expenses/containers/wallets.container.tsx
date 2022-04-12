import {
  useAppSelector,
  selectWalletsStep,
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

interface WalletsContainerProps {
  data: Wallet[];
}

export const WalletsContainer = ({ data }: WalletsContainerProps) => {
  const walletsStep = useAppSelector(selectWalletsStep);
  const [checkedWallets, handleSetCheckedWallet] = useCheckedWallets();
  const { openForCreate, openForEdit, close, formModalData, formModalId } =
    useFormModal<WalletFormData>();

  return (
    <>
      {formModalData && (
        <WalletFormModalContainer
          data={formModalData}
          id={formModalId}
          disabled={walletsStep === 'creating'}
          onClose={close}
        />
      )}
      <WalletsGridComponent
        data={data}
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
        onItemClick={(data) =>
          openForEdit(
            {
              name: data.name,
              description: data.description ?? '',
              color: data.color,
              currency: data.currency.value,
            },
            data.id
          )
        }
      />
    </>
  );
};
