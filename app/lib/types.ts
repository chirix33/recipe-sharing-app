export interface User  {
  id: string;
  name: string;
  email: string;
  password: string;
  accountType: 'email' | 'google';
  image: string;
};
  