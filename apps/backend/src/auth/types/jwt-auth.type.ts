export interface AuthJwtPayload {
  iat?: number;
  sub: number;
  name?: string;
  email: string;
  jti?: string;
  exp?: number;
  code?: number;
}
