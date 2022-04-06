import css from './layout.module.less';
import { ReactNode } from 'react';

interface LayoutComponentProps {
  children: ReactNode[] | ReactNode;
}

export const LayoutComponent = ({ children }: LayoutComponentProps) => {
  return <div className={css['container']}>{children}</div>;
};
