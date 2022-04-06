import css from './wallets-grid.module.less';
import { Id, Wallet } from '@iosoft/billytime-core';
import { WalletComponent } from '../wallet/wallet.component';

export type CheckedItems = Record<Id, boolean>;

interface WalletsGridComponentProps {
  data: Wallet[];
  checkedItems?: Record<Id, boolean>;
  onItemSelect: (data: Wallet) => void;
}

const BACKGROUND = [
  '#3376ed',
  '#f5b9dd',
  '#e8d8b7',
  '#c0aaee',
  '#9fcff4',
  '#802bd0',
  '#29b99b',
];

export const WalletsGridComponent = ({
  data,
  checkedItems = {},
  onItemSelect,
}: WalletsGridComponentProps) => {
  return (
    <div className={css['container']}>
      {data.map((item, idx) => (
        <div key={item.id} className={css['item']}>
          <WalletComponent
            data={item}
            checked={!!checkedItems[item.id]}
            background={BACKGROUND[idx]}
            onSelectClick={onItemSelect}
          />
        </div>
      ))}
    </div>
  );
};
