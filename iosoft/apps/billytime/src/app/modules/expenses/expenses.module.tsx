import { ExpensesContainer, WalletsContainer } from './containers';
import { LayoutComponent } from './components';
import {
  walletsActions,
  selectExpenses,
  selectWalletsData,
  selectWalletsStep,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import { useEffect } from 'react';
import { isDoneState, isFailState, isPendingState } from '@iosoft/sm';
import { WalletFormModalContainer } from './containers/wallet-form-modal.container';
import { CURRENCY_DICTIONARY } from '@iosoft/billytime-core';

export const ExpensesModule = () => {
  const walletsData = useAppSelector(selectWalletsData);
  const walletsStep = useAppSelector(selectWalletsStep);
  const expenses = useAppSelector(selectExpenses);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(walletsActions.loading());
  }, []);

  return (
    <LayoutComponent
      pending={walletsStep === 'loading' || isPendingState(expenses)}
      fail={walletsStep === 'loadFail' || isFailState(expenses)}
    >
      {() =>
        isDoneState(expenses) &&
        (walletsData.length === 0 ? (
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
            <WalletsContainer data={walletsData} />
            {/* <ExpensesContainer /> */}
          </>
        ))
      }
    </LayoutComponent>
  );
};
