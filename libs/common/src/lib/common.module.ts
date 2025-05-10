import { Module } from '@nestjs/common';
import { PubSubModule } from './pub-sub/pub-sub.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [PubSubModule, LoggerModule],
  controllers: [],
  providers: [],
  exports: [PubSubModule, LoggerModule],
})
export class CommonModule {}
