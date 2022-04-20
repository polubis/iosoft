const accountForm = {
  isLoading: false,
  isError: false,
  error: '',
  isSearchingUsers: false,
  isSearchingUsersError: false,
  values: {
    username: '',
    password: '',
    repeatedPassword: '',
    email: '',
  },
  errors: {
    username: '',
    password: '',
    repeatedPassword: '',
    email: '',
  },
  // ... etc
};

const handleEmailChange = (value: string) => {
  accountForm.values.email = value;
  accountForm.errors.email = value ? '' : 'Invalid email';
};

const handleSubmit = () => {
  if (accountForm.isSearchingUsers) {
    return;
  }

  accountForm.isLoading = false;
  accountForm.isError = false;
  accountForm.error = '';

  fetch('')
    .then((res) => res.json())
    .then((res) => {
      accountForm.isLoading = false;
      accountForm.isError = false;
      accountForm.error = '';
    })
    .catch((error) => {
      accountForm.isLoading = false;
      accountForm.isError = true;
      accountForm.error = error;
    });
};
