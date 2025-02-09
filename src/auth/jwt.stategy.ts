import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Извлечение токена из заголовка Authorization
      ignoreExpiration: false, // Токен с истекшим сроком действия будет отклонен
      secretOrKey: process.env.JWT_SECRET ?? '', // Секретный ключ для подписи/проверки токена
    });
  }

  async validate(payload: any) {
    // payload — это расшифрованный JWT токен
    // Здесь вы можете добавить дополнительную логику, например, проверку пользователя в базе данных
    return { userId: payload.sub, username: payload.username };
  }
}