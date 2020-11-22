export interface IHash {
  hash(hasher: string): Promise<string>;
  compare(text: string, hasher: string): Promise<boolean>;
}
