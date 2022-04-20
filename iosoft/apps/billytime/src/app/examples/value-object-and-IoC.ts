import { maxLength, minLength, required, useVo } from '@iosoft/vo';

const accountFormVo = useVo(
  {
    username: '',
    password: '',
    repeatedPassword: '',
    email: '',
  },
  {
    username: [required(), minLength(3), maxLength(20)], // IoC
    // As developer we declare validators and our value object runs them
  }
);

accountFormVo.onChange('email', 'someinvalidemail'); // change and validate
accountFormVo.onSubmit(); // submit and validate
accountFormVo.result.changed; // any field changed ?
accountFormVo.result.errors.password.message; // error message in password
accountFormVo.result.values; // { username, password, ...}
accountFormVo.result.keys; // ['username', ...]
accountFormVo.result.invalid; // is value object invalid
