import axios from 'axios';
import { environment } from '../../environments/environment';

interface InstanceConfig {
  API: string;
}

const createInstance = (config: InstanceConfig) => {
  const { API } = config;

  const instance = axios.create({
    baseURL: API,
    headers: { 'Content-Type': 'application/json' },
  });

  return instance;
};

export const AWS_INSTANCE = createInstance({ API: environment.API });
