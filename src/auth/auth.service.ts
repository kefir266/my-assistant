import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async login(email: string, password: string): Promise<Record<string, any>> {
    const user = await this.userService.getUserByEmail(email);
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }

    delete user.password;
    delete user.tokens;

    const token = await this.jwtService.signAsync({ ...user });
    await this.userService.addToken(user.id, token);

    return {
      access_token: token,
    };
  }
}
