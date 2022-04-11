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
