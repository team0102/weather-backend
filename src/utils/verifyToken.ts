import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  verifyToken(token: string): { aud: number } {
    const decodedToken = this.jwtService.verify(token);

    return decodedToken;
  }

  audienceFromToken(token: string): number {
    const decodedToken = this.jwtService.verify(token);
    const loginUserId = decodedToken.aud;
    return loginUserId;
  }
}
