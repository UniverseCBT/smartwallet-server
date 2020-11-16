import { v4 } from 'uuid';

export class User {
  public readonly id: string;

  public name: string;

  public username: string;

  public email: string;

  public password: string;

  public money_total = 0.0;

  constructor(props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = v4();
    }
  }
}
