import { AppState } from '../store';

export const walletsSelector = {
  step: ({ walletsReducer }: AppState) => walletsReducer.step,
  data: ({ walletsReducer }: AppState) =>
    walletsReducer.step === 'loaded' ? walletsReducer.data : [],
};
