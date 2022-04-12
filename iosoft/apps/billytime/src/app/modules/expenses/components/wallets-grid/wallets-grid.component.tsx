import css from './wallets-grid.module.less';
import { Id, Wallet } from '@iosoft/billytime-core';
import { WalletComponent } from '../wallet';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

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
      <div key="btn" className={css.item}>
        <Tooltip title="Add wallet">
          <IconButton className={css.btn} onClick={onCreateWalletClick}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};
