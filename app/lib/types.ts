export interface User  {
    id: string;
    email: string;
    password: string;
    accountType: 'email' | 'google';
    image: string;
  };
  