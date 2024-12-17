import { registerAs, ConfigType } from '@nestjs/config';

export const JwtConfig = registerAs('jwt', () => ({}));

export type IAppConfig = ConfigType<typeof JwtConfig>;

export default JwtConfig;
