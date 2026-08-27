import bcrypt from 'bcryptjs';
import { HashPort } from '../../application/ports/HashPort';

export class BcryptHashService implements HashPort {
  private readonly rounds: number = 10;

  public async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.rounds);
  }

  public async comparar(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
