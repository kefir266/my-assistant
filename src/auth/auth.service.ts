import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly logger: PinoLogger,
  ) {}

  async login(email: string, password: string): Promise<Record<string, any>> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException(`User ${email} not found`);
    }
    this.logger.info(`User ${email} is trying to login`);

    if (
      !user ||
      !password ||
      user.password !== this.userService.encrypt(password)
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    delete user.password;
    delete user.tokens;

    const token = await this.jwtService.signAsync(
      { ...user },
      {
        expiresIn: '1d',
      },
    );
    await this.userService.addToken(user.id, token);

    return {
      access_token: token,
    };
  }
}
