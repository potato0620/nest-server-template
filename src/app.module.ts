import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import Configs from '~/config'
import { AppController } from './app.controller'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [...Object.values(Configs)] }),
    ThrottlerModule.forRoot([{ ttl: 1000 * 10, limit: 100 }]), // 全局限流 十秒内最多可以请求100次
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
