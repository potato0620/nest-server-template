import type { ConfigType } from '@nestjs/config'
import { registerAs } from '@nestjs/config'

export const AppConfig = registerAs('app', () => ({}))

export type IAppConfig = ConfigType<typeof AppConfig>
