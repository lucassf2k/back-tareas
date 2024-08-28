export const envs = Object.freeze({
  APP_PORT: Number(process.env.APP_PORT) || 3001,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
});
