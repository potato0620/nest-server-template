import type { INestApplication } from '@nestjs/common'
import type { OpenAPIObject, SwaggerCustomOptions } from '@nestjs/swagger'
import os from 'node:os'
import { Logger } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export function getLocalIPv4Address() {
  const interfaces = os.networkInterfaces()
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]!) {
      // 检查是否为IPv4地址且不是内部地址
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address
      }
    }
  }
  return ''
}

export async function printStartMessage(
  app: INestApplication,
  options: Record<string, string>,
): Promise<void> {
  const port = options.port || 3000
  const localIp = getLocalIPv4Address()

  await app.listen(port, '0.0.0.0', async () => {
    const logger = new Logger('NestApplication')
    const url = await app.getUrl()

    logger.log(`🎉 start successfully ~ =============================`)
    logger.log(`Server running: ${url}`)
    logger.log(`LocalIP Server running: http://${localIp}:${port}`)

    // open api
    logger.log(`Swagger: ${url}/${options.prefix}/docs`)
    logger.log(`Swagger: http://${localIp}:${port}/${options.prefix}/docs`)
  })
}

export function swaggerConfig(
  app: INestApplication,
  options: Record<string, string>,
): void {
  const config = new DocumentBuilder()
    .setTitle('Server')
    .setDescription('接口文档描述')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      description: '调取登陆接口获取token后填入，通过认证以调用以下接口',
    })
    .build()
  const documentFactory = (): OpenAPIObject =>
    SwaggerModule.createDocument(app, config)

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Server API', // html title
    raw: true, // 允许访问原始数据
    url: '/docs-json',
  }

  SwaggerModule.setup(
    options.prefix ? `${options.prefix}/docs` : 'docs',
    app,
    documentFactory,
    customOptions,
  )
}
