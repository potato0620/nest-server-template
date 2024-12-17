import { registerAs, ConfigType } from '@nestjs/config';

export const AppConfig = registerAs('app', () => ({}));

export type IAppConfig = ConfigType<typeof AppConfig>;
