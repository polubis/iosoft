import { AuthorizedUser, LogInFormData } from '@iosoft/billytime-core';
import { from, Observable } from 'rxjs';
import { AWS_INSTANCE } from './instances';

export const authorizationService = {
  logIn: (data: LogInFormData): Observable<AuthorizedUser> =>
    from(
      AWS_INSTANCE.post('/authorization/log-in', data).then((res) => res.data)
    ),
};
