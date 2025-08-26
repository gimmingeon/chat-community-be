import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserSkillModule } from './user-skill/user-skill.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get<string>("DB_HOST"),
        port: +configService.get<number>("DB_PORT"),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_NAME"),
        synchronize: configService.get<boolean>("DB_SYNC"),
        // 자동으로 엔티티를 불러오는 기능
        autoLoadEntities: true,
        logging: true
      }),
    }),
    UserModule,
    UserSkillModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
