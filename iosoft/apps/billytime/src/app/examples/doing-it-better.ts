export type NState<T extends string, D = null> = D extends null
  ? { step: T }
  : { step: T; data: D };

export interface Stateable {
  type: string;
}

export const next = <
  S extends { step: string; data?: any },
  K extends S['step']
>(
  state: S, // current state
  to: K, // to step
  allow: S['step'] | S['step'][], // which steps are allowed
  dataSetter?: S['data'] | ((state: S & { step: K }) => void) // data or function which sets data
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
