import { ExpensesContainer, WalletsContainer } from './containers';
import { LayoutComponent } from './components';
import {
  loadWallets,
  selectExpenses,
  selectWallets,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import { useEffect } from 'react';
import { isDoneState, isFailState, isPendingState } from '@iosoft/sm';
import { WalletFormModalContainer } from './containers/wallet-form-modal.container';
import { CURRENCY_DICTIONARY } from '@iosoft/billytime-core';

export const ExpensesModule = () => {
  const wallets = useAppSelector(selectWallets);
  const expenses = useAppSelector(selectExpenses);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadWallets());
  }, []);

  return (
    <LayoutComponent
      pending={isPendingState(wallets) || isPendingState(expenses)}
      fail={isFailState(wallets) || isFailState(expenses)}
    >
      {() =>
        isDoneState(wallets) &&
        isDoneState(expenses) &&
        (wallets.data.length === 0 ? (
          <WalletFormModalContainer
            id={-1}
            header="Create your first wallet"
            data={{
              color: '#000',
              name: 'My first wallet',
              description: '',
              currency: CURRENCY_DICTIONARY[0].value,
            }}
            onClose={() => {}}
          />
        ) : (
          <>
            <WalletsContainer data={wallets.data} />
            <ExpensesContainer />
          </>
        ))
      }
    </LayoutComponent>
  );
};
