import { ResponseAuthDto } from '../dtos/ResponseAuthDto';

export abstract class AuthRepository {
  abstract login(email: string, password: string): Promise<ResponseAuthDto>;
}
