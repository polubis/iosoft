import css from './wallets-grid.module.less';
import { Wallet } from '@iosoft/billytime-core';
import { WalletComponent } from './wallet.component';

interface WalletsGridComponentProps {
  data: Wallet[];
  onItemClick: (data: Wallet) => void;
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

export const WalletsGridComponent = ({ data, onItemClick }: WalletsGridComponentProps) => {
  return (
    <div className={css['container']}>
      {data.map((item, idx) => (
        <div key={item.id} className={css['item']}>
          <WalletComponent
            data={item}
            background={BACKGROUND[idx]}
            onNextClick={onItemClick}
          />
        </div>
      ))}
    </div>
  );
};
