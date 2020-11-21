export interface ICreateSessionDTO {
  username?: string;
  email?: string;
  password: string;
}

export interface ResponseUserData {
  user: {
    username?: string;
    email?: string;
    password: string;
  };
  token: string;
}
