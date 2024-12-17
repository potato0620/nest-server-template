import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import Config from '~/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [...Object.values(Config)] }),
    ThrottlerModule.forRoot([{ ttl: 1000 * 10, limit: 100 }]), // 全局限流 十秒内最多可以请求100次
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
