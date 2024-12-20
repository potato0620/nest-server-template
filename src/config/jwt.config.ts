import type { ConfigType } from '@nestjs/config'
import process from 'node:process'
import { registerAs } from '@nestjs/config'

export const JwtConfig = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'potato-secret-key',
}))

export type IAppConfig = ConfigType<typeof JwtConfig>
