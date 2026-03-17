import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request as RequestType } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
    ) {
        super({
            // 사용자 정보를 조회 jwt 토큰을 사용해서
            jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
        });
    }

    private static extractJWT(req: RequestType): string | null {
        const authorization = req.cookies['authorization'];
        if (authorization) {
            const [tokenType, token] = authorization.split(' ');
            if (tokenType !== 'Bearer')
                throw new BadRequestException('토큰 타입이 일치하지 않습니다.');
            if (!token) {
                throw new UnauthorizedException('토큰이 유효하지 않습니다.');
            }
            return token;
        }
        return null;
    }

    async validate(payload: any) {
        //console.log('JWT Payload:', payload);

        // req.user에 저장이 된다
        return {
            id: payload.id,
            email: payload.email,
            nickname: payload.nickname
        };
    }
}