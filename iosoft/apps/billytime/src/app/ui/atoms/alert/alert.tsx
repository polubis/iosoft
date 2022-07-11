import { memo } from 'react';

import { Close } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

import css from './alert.module.less';

export type AlertType = 'error' | 'success';

export interface AlertProps {
  message: string;
  marker: string | number;
  type?: AlertType;
  onClose?: () => void;
}

export const Alert = memo(
  ({ marker, message, type = 'error', onClose }: AlertProps) => {
    return (
      <div className={`${css.alert} ${css[type]}`}>
        <span className={css.marker}>{marker}</span>

        <div className={css.divider} />

        <span className={css.message}>{message}</span>

        {onClose && (
          <IconButton className={css.closeBtn} onClick={onClose}>
            <Close />
          </IconButton>
        )}
      </div>
    );
  },
  () => true
);
