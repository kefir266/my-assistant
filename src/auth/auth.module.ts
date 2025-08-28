import { Module } from '@nestjs/common';
import { TokenGard } from './guards/tokenGard';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get('SECRET'),
        signOptions: { expiresIn: '600s' },
      }),
    }),
  ],
  providers: [TokenGard, AuthService],
  exports: [TokenGard, AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
