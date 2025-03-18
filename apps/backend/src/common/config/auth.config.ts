import { registerAs } from '@nestjs/config';

export interface AuthConfig {
  google: {
    clientId: string;
    clientSecret: string;
    callbackUrl: string;
  };
}

export default registerAs<AuthConfig>('auth', () => ({
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackUrl: process.env.GOOGLE_CALLBACK_URL || ''
  }
}));
