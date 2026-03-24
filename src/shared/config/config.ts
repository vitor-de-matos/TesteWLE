export const config = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  production: process.env.PRODUCTION,

  dbPostgresHost: process.env.DB_PG_HOST,
  dbPostgresPort: process.env.DB_PG_PORT,
  dbPostgresUsername: process.env.DB_PG_USERNAME,
  dbPostgresPassword: process.env.DB_PG_PASSWORD,
  dbPostgresDatabase: process.env.DB_PG_DATABASE,
  dbPostgresSchema: process.env.DB_PG_SCHEMA,
});
