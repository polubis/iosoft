interface State {
  type: string;
  data?: any;
}

const idle = () => ({ type: 'idle' } as const);

const working = () => ({ type: 'working' } as const);

const outOfService = () =>
  ({
    type: 'outOfService',
    data: { error: 'Out of service' },
  } as const);

type CustomState =
  | ReturnType<typeof idle>
  | ReturnType<typeof working>
  | ReturnType<typeof outOfService>;

let state = idle() as CustomState;

const handleClick = () => {
  if (state.type !== 'idle') {
    throw new Error(
      `Invalid state change. Cannot change state from ${state.type} to working`
    );
  }

  state = working();

  setTimeout(() => {
    state = outOfService();
  }, 1000);
};
