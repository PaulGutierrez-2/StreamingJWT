import { Module } from '@nestjs/common';
import { SerieService } from './serie.service';
import { SerieController } from './serie.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SerieController],
  providers: [SerieService, PrismaService],
})
export class SerieModule {}
