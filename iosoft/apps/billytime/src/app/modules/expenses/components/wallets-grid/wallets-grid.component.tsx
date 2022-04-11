import css from './wallets-grid.module.less';
import { Id, Wallet } from '@iosoft/billytime-core';
import { WalletComponent } from '../wallet';

export type CheckedItems = Record<Id, boolean>;

interface WalletsGridComponentProps {
  data: Wallet[];
  checkedItems?: Record<Id, boolean>;
  onItemSelect: (data: Wallet) => void;
  onCreateWalletClick: () => void;
  onItemClick: (data: Wallet) => void;
}

export const WalletsGridComponent = ({
  data,
  checkedItems = {},
  onItemSelect,
  onCreateWalletClick,
  onItemClick,
}: WalletsGridComponentProps) => {
  return (
    <>
      <div className={css.container}>
        {data.map((item) => (
          <div key={item.id} className={css.item}>
            <WalletComponent
              data={item}
              checked={!!checkedItems[item.id]}
              background={item.color}
              onSelectClick={onItemSelect}
              onClick={onItemClick}
            />
          </div>
        ))}
      </div>
      <button onClick={onCreateWalletClick}>Create wallet</button>
    </>
  );
};
