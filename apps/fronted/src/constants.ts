export const CONFIG = {
  BACKEND_URL: process.env.BACKEND_URL ?? 'http://localhost:5000/graphql',
  PAGE_SIZE: parseInt(process.env.PAGE_SIZE!) ?? 10
};
