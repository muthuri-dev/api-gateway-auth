import { Module } from '@nestjs/common';
import { SharedprismaService } from './sharedprisma.service';

@Module({
  providers: [SharedprismaService],
  exports: [SharedprismaService],
})
export class SharedprismaModule {}
