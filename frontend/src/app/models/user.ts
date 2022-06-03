export class User {
  email!: string;
  name!: string;
}

export class LoginCredentials {
  email!: string;
  password!: string;
}

export class LoginResponse {
  token!: string;
  user!: User;
}
