import { Module } from '@nestjs/common';
import { ApplyService } from './apply.service';
import { ApplyController } from './apply.controller';

@Module({
  controllers: [ApplyController],
  providers: [ApplyService],
  imports: [],
})
export class ApplyModule {}
