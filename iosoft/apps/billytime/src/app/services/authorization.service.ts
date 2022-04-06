import { LogInFormData } from '@iosoft/billytime-core';
import { from } from 'rxjs';
import { AWS_INSTANCE } from './instances';

export const authorizationService = {
  logIn: (data: LogInFormData) =>
    from(AWS_INSTANCE.post('/expenses', data).then((res) => res.data)),
};
