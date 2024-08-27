import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    this.logger.log(username, pass);
    const user = await this.usersService.findByName(username);
    this.logger.log(user);
    if (!user)
      throw new UnauthorizedException('No account with this username is found');
    const verified = this.usersService.verify(pass, user.saltedPassword);
    if (!verified) throw new UnauthorizedException('Wrong password');
    const payload = { sub: user.id, username: user.name, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
