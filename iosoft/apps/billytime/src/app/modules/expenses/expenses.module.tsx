import {
  ExpensesContainer,
  WalletFormModalContainer,
  WalletsContainer,
} from './containers';
import { LayoutComponent } from './components';
import {
  walletsAction,
  walletsSelector,
  expensesSelector,
  useAppDispatch,
  useAppSelector,
  expensesAction,
} from '../../store';
import { useEffect } from 'react';

export const ExpensesModule = () => {
  const walletsStep = useAppSelector(walletsSelector.step);
  const expensesStep = useAppSelector(expensesSelector.step);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(walletsAction.loading());
  }, []);

  useEffect(() => {
    return () => {
      dispatch(walletsAction.idle());
      dispatch(expensesAction.idle());
    };
  }, []);

  return (
    <>
      <WalletFormModalContainer />

      <LayoutComponent
        pending={walletsStep === 'loading' || expensesStep === 'loading'}
        fail={walletsStep === 'loadFail' || expensesStep === 'loadFail'}
      >
        {() => (
          <>
            <WalletsContainer />
            <ExpensesContainer />
          </>
        )}
      </LayoutComponent>
    </>
  );
};
