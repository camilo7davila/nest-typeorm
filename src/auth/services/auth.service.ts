import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

import { UsersService } from 'src/users/services/users.service';
import { PayloadToken } from '../models/token.model';

import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersServices: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.usersServices.findByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      return user;
    }
    return null;
  }

  generateJWT (user: User) {
    const payload: PayloadToken = { 
      role: user.role,
      sub: user.id
    }
    return {
      access_token: this.jwtService.sign(payload),
      user
    }
  }
}
