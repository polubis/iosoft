import { Wallet } from '@iosoft/billytime-core';
import css from './wallet.module.less';
import Checkbox from '@mui/material/Checkbox';

interface WalletComponentProps {
  data: Wallet;
  checked?: boolean;
  background: string;
  onSelectClick: (data: Wallet) => void;
}

export const WalletComponent = ({
  data,
  background,
  checked,
  onSelectClick,
}: WalletComponentProps) => {
  return (
    <div className={`${css['container']}`} style={{ background }}>
      <header>
        <span>{data.name}</span>
        <span>
          {data.balance} {data.currency.label}
        </span>
      </header>
      <Checkbox
        className={css['checkbox']}
        checked={checked}
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
