import { Expense, Id } from '@iosoft/billytime-core';
import { Observable, from } from 'rxjs';
import { environment } from 'apps/billytime/src/environments/environment';
import axios from 'axios';

interface Service<T> {
  getMany: () => Observable<T[]>;
  getOne: () => Observable<T>;
  postOne: <P>(payload: P) => Observable<T>;
  putOne: <P>(id: Id, payload: P) => Observable<T>;
  URL: string;
}

interface InstanceConfig {
  API: string;
}

const createInstance = (config: InstanceConfig) => {
  const { API } = config;

  const instance = axios.create({
    baseURL: API,
    headers: { 'Content-Type': 'application/json' },
  });

  const createService = <T>(controller: string | string[]): Service<T> => {
    const controllerPath = [
      ...(Array.isArray(controller) ? controller : [controller]),
    ].join('/');
    const URL = [API, controllerPath].join('/');

    const makeGetRequest = () => {
      return from(instance.get(URL).then((res) => res.data));
    };

    return {
      getMany: () => makeGetRequest(),
      getOne: () => makeGetRequest(),
      postOne: <P>(payload: P) =>
        from(instance.post(URL, payload).then((res) => res.data)),
      putOne: <P>(id: string | number, payload: P) =>
        from(instance.put(URL + '/' + id, payload).then((res) => res.data)),
      URL,
    };
  };

  return createService;
};

const createAWSService = createInstance({
  API: environment.API,
});

export const ExpensesService = createAWSService<Expense>('expenses');
