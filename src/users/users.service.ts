import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/User';

const algorithm = 'aes-256-cbc';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly config: ConfigService,
  ) {}

  getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create({
      ...user,
      password: user.password ? this.encrypt(user.password) : undefined,
    });

    return this.userRepository.save(newUser);
  }

  async addToken(id: string, token: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('UserRequest not found');
    }
    const tokens: string[] =
      (JSON.parse(user.tokens || '[]') as string[]) || [];
    tokens.push(token);
    await this.userRepository.update(id, { tokens: JSON.stringify(tokens) });
    return user;
  }

  encrypt(text: string): string {
    const cipher = crypto.createCipheriv(
      algorithm,
      new Buffer(
        this.config.get('CRYPTO_KEY') || 'CRYPTO_KEY_ASSISTANT_12345678910',
      ),
      new Buffer(this.config.get('CRYPTO_IV') || 'CRYPTO_IV_ASSIST'),
    );
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }
}
