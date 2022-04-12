import { Id } from './general.model';

export interface AuthorizedUser {
  id: Id;
  username: string;
}

export interface LogInFormData {
  username: string;
  password: string;
}
