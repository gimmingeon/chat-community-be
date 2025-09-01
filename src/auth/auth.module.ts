import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: "jwt", session: false }),

        JwtModule.registerAsync({
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>("JWT_SECRET_KEY"),
            }),
            inject: [ConfigService],
        }),
        UserModule
    ],
    providers: [JwtModule]
})
export class AuthModule { }