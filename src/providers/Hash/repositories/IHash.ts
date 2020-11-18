export interface IHash {
  hash(hasher: string): Promise<string>;
  compare(hasher: string, text: string): Promise<boolean>;
}
