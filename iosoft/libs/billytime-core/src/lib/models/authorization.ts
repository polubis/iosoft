import { Id } from './general';

export interface LoggedInUser {
  id: Id;
  username: string;
}

export interface LogInFormData {
  username: string;
  password: string;
}
