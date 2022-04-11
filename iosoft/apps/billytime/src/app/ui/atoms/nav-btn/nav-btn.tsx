import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { ReactNode } from 'react';

import css from './nav-btn.module.less';

export interface NavBtnProps {
  active?: boolean;
  title: string;
  children: ReactNode;
}

export const NavBtn = ({ active, title, children }: NavBtnProps) => {
  return (
    <Tooltip title={title}>
      <IconButton className={`${css.btn} ${active ? css.active : ''}`} size="large">
        {children}
      </IconButton>
    </Tooltip>
  );
};
