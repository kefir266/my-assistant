import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isLocal = config.get('ENV') === 'local';
        return {
          pinoHttp: {
            name: 'assistant-api',
            level: isLocal ? 'debug' : 'info',
            transport: isLocal
              ? {
                  target: 'pino-pretty',
                  options: {
                    colorize: true,
                    singleLine: true,
                    ignore: 'pid,hostname',
                  },
                }
              : undefined,
          },
        };
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'sqlite',
        database: config.get('SQLLITE_DB_PATH'),
        entities: [__dirname + '/models/*{.ts,.js}'],
        synchronize: config.get('ENV') === 'local',
        logging: config.get('ENV') === 'local' ? ['query', 'error'] : ['error'],
      }),
    }),
    NotesModule,
    UsersModule,
    AuthModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
