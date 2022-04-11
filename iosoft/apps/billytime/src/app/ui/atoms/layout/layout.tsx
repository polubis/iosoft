import { ReactNode } from 'react';

import css from './layout.module.less';

interface Props {
  children: [ReactNode, ReactNode, ReactNode];
}

export const Layout = ({ children }: Props) => {
  const [Header, Nav, Main] = children;

  return (
    <div className={css.layout}>
      <header className={css.header}>{Header}</header>
      <nav className={css.nav}>{Nav}</nav>
      <main className={css.main}>{Main}</main>
    </div>
  );
};
