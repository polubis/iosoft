import { Wallet } from '@iosoft/billytime-core';
import css from './wallet.module.less';
import Checkbox from '@mui/material/Checkbox';

interface WalletComponentProps {
  data: Wallet;
  checked?: boolean;
  background: string;
  onSelectClick: (data: Wallet) => void;
  onClick: (data: Wallet) => void;
}

export const WalletComponent = ({
  data,
  background,
  checked,
  onSelectClick,
  onClick,
}: WalletComponentProps) => {
  return (
    <div
      className={css.container}
      style={{ background }}
      onClick={() => onClick(data)}
    >
      <header>
        <span>{data.name}</span>
        <span>
          {data.balance} {data.currency.label}
        </span>
      </header>
      <Checkbox
        className={css.checkbox}
        checked={checked}
        onClick={(e) => e.stopPropagation()}
        onChange={() => onSelectClick(data)}
        sx={{
          color: '#fff',
          '&.Mui-checked': {
            color: '#fff',
          },
        }}
      />
    </div>
  );
};
