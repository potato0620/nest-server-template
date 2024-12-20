import process from 'node:process'
import {
  ValidationPipe,
  VERSION_NEUTRAL,
  VersioningType,
} from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import compression from 'compression'
import { AppModule } from './app.module'
import { printStartMessage, swaggerConfig } from './utils/bootstrap.util'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const prefix = 'api'
  const corsOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',')
    : true

  app.setGlobalPrefix(prefix)

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
  })

  app.use(compression()) // 开启压缩 gzip
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: false })) // 注入验证管道 开启白名单验证 开启自动转换

  app.enableVersioning({
    type: VersioningType.URI, // 识别版本类型
    defaultVersion: VERSION_NEUTRAL, // 默认版本 [无版本]
  })

  swaggerConfig(app, { prefix })

  printStartMessage(app, {
    name: 'Server',
    port: process.env.PORT!,
    prefix,
  })
}

bootstrap()
