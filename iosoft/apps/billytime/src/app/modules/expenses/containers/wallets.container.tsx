import {
  walletsSelector,
  useAppDispatch,
  useAppSelector,
  walletAction,
} from '../../../store';
import { useState } from 'react';
import { CheckedItems, WalletsGridComponent } from '../components';
import { CURRENCY_DICTIONARY, Wallet } from '@iosoft/billytime-core';

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
  const dispatch = useAppDispatch();
  const walletsData = useAppSelector(walletsSelector.data);

  const [checkedWallets, handleSetCheckedWallet] = useCheckedWallets();

  return (
    <WalletsGridComponent
      data={walletsData}
      checkedItems={checkedWallets}
      onItemSelect={handleSetCheckedWallet}
      onCreateWalletClick={() =>
        dispatch(
          walletAction.create({
            name: '',
            description: '',
            color: '#000',
            currency: CURRENCY_DICTIONARY[0].value,
          })
        )
      }
      onItemClick={(data) =>
        dispatch(
          walletAction.edit({
            id: data.id,
            data: {
              name: data.name,
              description: data.description ?? '',
              color: data.color,
              currency: data.currency.value,
            },
          })
        )
      }
    />
  );
};
