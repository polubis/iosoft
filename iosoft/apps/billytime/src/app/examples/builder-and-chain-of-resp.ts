interface UserModel {
  username: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const User = (user: UserModel): UserModel => {
  if (user.id < -1) {
    throw new Error('Negative id???');
  }

  if (user.username.length < 8 || user.username.length > 20) {
    throw new Error('Username should be between 8-20 characters');
  }

  return user;
};

const UsersBuilder = (
  user = User({
    username: 'piecia2000',
    email: 'piecia2000@wp.pl',
    firstName: 'Piotr',
    lastName: 'Piotrowicz',
    id: 0,
  })
) => {
  return {
    set: <P extends keyof UserModel>(property: P, value: UserModel[P]) =>
      UsersBuilder(User({ ...user, [property]: value })),
    valueOf: () => user,
  };
};

const pieciaBuilder = UsersBuilder(); // piecia2000 builder

const wojoKoloBuilder = pieciaBuilder.set('firstName', 'wojokolo'); // wojokolo builder

wojoKoloBuilder.valueOf(); // -> returns pure model
