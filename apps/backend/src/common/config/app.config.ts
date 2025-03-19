import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  return {
    DATABASE_URL: process.env.DATABASE_URL,
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000'
  };
});
