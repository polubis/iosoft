import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

import css from './btn.module.less';

interface ButtonProps extends MuiButtonProps {}

export const Btn = {
  Primary: (props: ButtonProps) => (
    <MuiButton {...props} className={css.primary} />
  ),
};
