export type NState<T extends string, D = null> = D extends null
  ? { step: T }
  : { step: T; data: D };

export interface Stateable {
  type: string;
}

export interface IdleState extends Stateable {
  type: 'Idle';
}

export interface PendingState extends Stateable {
  type: 'Pending';
}

export interface DoneState<T> extends Stateable {
  type: 'Done';
  data: T;
}

export interface FailState extends Stateable {
  type: 'Fail';
}

export type State<T> = IdleState | PendingState | DoneState<T> | FailState;

export const Idle = (): IdleState => ({ type: 'Idle' });
export const Pending = (): PendingState => ({ type: 'Pending' });
export const Done = <T>(data: T): DoneState<T> => ({ data, type: 'Done' });
export const Fail = (): FailState => ({ type: 'Fail' });

export const isPendingState = <T>(state: State<T>): state is PendingState =>
  state.type === 'Pending';

export const isDoneState = <T>(state: State<T>): state is DoneState<T> =>
  state.type === 'Done';

export const isFailState = <T>(state: State<T>): state is FailState =>
  state.type === 'Fail';

// Add mapping type which removes double union in return
// To dataSetter callback pass only data
// Try to implement curried version with infer next('creating', 'created', s => {})
// add option to use is in reducers
export const next = <
  S extends { step: string; data?: any },
  K extends S['step']
>(
  state: S,
  to: K,
  allow: S['step'] | S['step'][],
  dataSetter?: S['data'] | ((state: S & { step: K }) => void)
) => {
  const allowArr = Array.isArray(allow) ? allow : [allow];

  if (!allowArr.includes(state.step)) {
    throw new Error(
      `[INVALID_STATE_CHANGE_DETECTED] Allowed states are ${allowArr.join(',')}`
    );
  }

  state.step = to;

  if (!dataSetter) {
    return state as S & { step: K };
  }

  if (typeof dataSetter !== 'function') {
    state.data = dataSetter;
    return state as S & { step: K };
  }

  if (typeof dataSetter === 'function') {
    (dataSetter as Function)(state);
  }

  return state as S & { step: K };
};

export const isBusy = (step: string) => step.includes('ing');
