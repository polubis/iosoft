import { configureStore, AnyAction, combineReducers } from '@reduxjs/toolkit';
import { expensesReducer } from './slices';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { expensesEpic, expensesCreationEpic } from './epics';

const rootReducer = combineReducers({
  expensesReducer,
});
const rootEpic = combineEpics(expensesEpic, expensesCreationEpic);

export type AppState = ReturnType<typeof rootReducer>;

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, AppState>();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export { store };
