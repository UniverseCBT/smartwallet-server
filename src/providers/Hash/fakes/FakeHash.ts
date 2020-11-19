import { IHash } from '../repositories/IHash';

export class FakeHash implements IHash {
  public async hash(hasher: string): Promise<string> {
    return hasher;
  }

  public async compare(hasher: string, text: string): Promise<boolean> {
    const comparehash = hasher === text;

    return comparehash;
  }
}
