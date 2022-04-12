export type State<T extends string, D = null> = D extends null
  ? { step: T }
  : { step: T; data: D };

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
  allow: S['step'] | S['step'][] = [],
  dataSetter?: S['data'] | ((state: S & { step: K }) => void)
) => {
  const allowArr = Array.isArray(allow) ? allow : [allow];

  if (allow.length > 0 && !allowArr.includes(state.step)) {
    throw new Error(
      `[INVALID_STATE_CHANGE_DETECTED] From: ${
        state.step
      } to: ${to} allowed: ${allowArr.join(',')}`
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
