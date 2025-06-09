import { Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateContentDto) {
    return this.prisma.content.create({ data });
  }

  findAll(params: { skip?: number; take?: number; search?: string } = {}) {
    const { skip = 0, take = 10, search } = params;
    return this.prisma.content.findMany({
      skip,
      take,
      where: search
        ? { nombre: { contains: search, mode: 'insensitive' } }
        : undefined,
    });
  }

  async findAllSummary() {
    return this.prisma.$queryRaw<
      { id: number; nombre: string; tipo: string; genero: string; duracion: number }[]
    >`SELECT * FROM content_summary`;
  }

  findOne(id: number) {
    return this.prisma.content.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateContentDto) {
    return this.prisma.content.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.content.delete({ where: { id } });
  }
}
