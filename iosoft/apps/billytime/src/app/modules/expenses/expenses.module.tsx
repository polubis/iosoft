import { ExpensesContainer, WalletsContainer } from './containers';
import { LayoutComponent } from './components';
import { loadWallets, useAppDispatch } from '../../store';
import { useEffect } from 'react';

export const ExpensesModule = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadWallets());
  }, []);

  return (
    <>
      <LayoutComponent>
        <WalletsContainer />
        <ExpensesContainer />
      </LayoutComponent>
    </>
  );
};
