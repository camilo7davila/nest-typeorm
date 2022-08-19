import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { PayloadToken } from "../models/token.model";
import config from '../../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(config.KEY) configService: ConfigType<typeof config> 
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtSecret
    });
  }

  async validate(payload: PayloadToken) {
    return payload;
  }
}