import { registerAs } from '@nestjs/config';

export default registerAs('db', () => {
  return {
    DATABASE_URL: process.env.DATABASE_URL,
  };
});
