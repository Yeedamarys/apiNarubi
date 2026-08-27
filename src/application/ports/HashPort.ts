export interface HashPort {
  hash(password: string): Promise<string>;
  comparar(password: string, hash: string): Promise<boolean>;
}
