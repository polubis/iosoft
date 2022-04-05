import { CURRENCY_DICTIONARY } from '@iosoft/billytime-core';
import { WalletsGridComponent } from './wallets-grid.component';

export const WalletsModule = () => {
  return (
    <WalletsGridComponent
      onItemClick={(data) => {}}
      data={[
        {
          id: 0,
          name: 'My euro wallet',
          description: 'Here hold euros',
          balance: 2000,
          currency: CURRENCY_DICTIONARY[0],
        },
        {
          id: 1,
          name: 'My euro wallet',
          description: 'Here hold euros',
          balance: 2000,
          currency: CURRENCY_DICTIONARY[0],
        },
        {
          id: 2,
          name: 'My euro wallet',
          description: 'Here hold euros',
          balance: 2000,
          currency: CURRENCY_DICTIONARY[0],
        },
        {
          id: 3,
          name: 'My euro wallet',
          description: 'Here hold euros',
          balance: 2000,
          currency: CURRENCY_DICTIONARY[0],
        },
        {
          id: 4,
          name: 'My euro wallet',
          description: 'Here hold euros',
          balance: 2000,
          currency: CURRENCY_DICTIONARY[0],
        },
        {
          id: 5,
          name: 'My euro wallet',
          description: 'Here hold euros',
          balance: 2000,
          currency: CURRENCY_DICTIONARY[0],
        },
        {
          id: 6,
          name: 'My euro wallet',
          description: 'Here hold euros',
          balance: 2000,
          currency: CURRENCY_DICTIONARY[0],
        },
      ]}
    />
  );
};
