import { LogInFormData } from '@iosoft/billytime-core';
import { from } from 'rxjs';
import { AWS_INSTANCE } from './instances';

export const authorizationService = {
  logIn: (data: LogInFormData) =>
    from(
      AWS_INSTANCE.post('/authorization/log-in', data).then((res) => res.data)
    ),
};
