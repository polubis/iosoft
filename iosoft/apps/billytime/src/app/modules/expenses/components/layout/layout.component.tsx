import css from './layout.module.less';
import { ReactNode } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

interface LayoutComponentProps {
  children: () => ReactNode;
  pending: boolean;
  fail: boolean;
}

export const LayoutComponent = ({
  children,
  pending,
  fail,
}: LayoutComponentProps) => {
  return (
    <div className={css.container}>
      {pending && <CircularProgress className={css.loader} />}
      {!pending && !fail && children()}
    </div>
  );
};
