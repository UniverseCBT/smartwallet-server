import { hash, compare } from 'bcrypt';

import { IHash } from '../repositories/IHash';

export class Bcrypt implements IHash {
  public async hash(hasher: string): Promise<string> {
    const textHash = await hash(hasher, 10);

    return textHash;
  }

  public async compare(text: string, hasher: string): Promise<boolean> {
    const compareHash = await compare(text, hasher);

    return compareHash;
  }
}
