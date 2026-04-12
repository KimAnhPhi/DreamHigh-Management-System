import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [LeadsService, PrismaService],
  controllers: [LeadsController],
  exports: [LeadsService],
})
export class LeadsModule {}
