import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector, selectWallets } from '../../../store';
import { useState } from 'react';
import { CheckedItems, WalletsGridComponent } from '../components';
import { Wallet } from '@iosoft/billytime-core';

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

  if (wallets.type === 'Pending') {
    return <CircularProgress />;
  }

  if (wallets.type === 'Done') {
    return (
      <WalletsGridComponent
        data={wallets.data}
        checkedItems={checkedWallets}
        onItemSelect={handleSetCheckedWallet}
      />
    );
  }

  return null;
};
