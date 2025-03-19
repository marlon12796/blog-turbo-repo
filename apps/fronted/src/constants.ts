export const CONFIG = {
  BACKEND_URL: process.env.BACKEND_URL ?? 'http://localhost:5000/graphql',
  BASE_BACKEND_URL: process.env.BACKEND_URL?.replace('/graphql', '') ?? 'http://localhost:5000',
  PAGE_SIZE: parseInt(process.env.PAGE_SIZE ?? '10'),
  COMMENTS_SIZE: parseInt(process.env.COMMENT_SIZE ?? '10')
};
