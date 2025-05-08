import { Module } from '@nestjs/common';
import { PubSubModule } from './pub-sub/pub-sub.module';

@Module({
  imports: [PubSubModule],
  controllers: [],
  providers: [],
  exports: [PubSubModule],
})
export class CommonModule {}
