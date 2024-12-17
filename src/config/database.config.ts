import { registerAs, ConfigType } from '@nestjs/config';

export const DatabaseConfig = registerAs('database', () => ({
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT) || 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
  migrations: ['dist/src/migrations/*{.ts,.js}'],
  entities: ['dist/src/**/*.entity{.ts,.js}'],
}));

export type IDatabaseConfig = ConfigType<typeof DatabaseConfig>;

export default DatabaseConfig;