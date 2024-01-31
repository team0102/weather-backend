import { JwtService } from '@nestjs/jwt';

export function verifyToken(token: string): { aud: number } {
  // JwtService의 인스턴스를 생성
  const jwtService = new JwtService();

  // verify 메서드를 사용해 토큰 검증
  const decodedToken = jwtService.verify(token);

  return decodedToken;
}
