import { Wallet } from '@iosoft/billytime-core';
import IconButton from '@mui/material/IconButton';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import css from './wallet.module.less';

interface WalletComponentProps {
  data: Wallet;
  background: string;
  onNextClick: (data: Wallet) => void;
}

export const WalletComponent = ({
  data,
  background,
  onNextClick,
}: WalletComponentProps) => {
  return (
    <div className={css['container']} style={{ background }}>
      <header>
        <span>{data.name}</span>
        <span>
          {data.balance} {data.currency.label}
        </span>
      </header>
      <IconButton
        className={css['btnNext']}
        aria-label="next"
        onClick={() => onNextClick(data)}
      >
        <NavigateNextIcon />
      </IconButton>
    </div>
  );
};
