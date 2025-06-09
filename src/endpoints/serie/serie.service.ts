import { Injectable } from '@nestjs/common';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SerieService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateSerieDto) {
    return this.prisma.serie.create({ data });
  }

  findAll(params: { skip?: number; take?: number; search?: string } = {}) {
    const { skip = 0, take = 10, search } = params;
    return this.prisma.serie.findMany({
      skip,
      take,
      where: search
        ? { nombre: { contains: search, mode: 'insensitive' } }
        : undefined,
    });
  }

  async findAllSummary() {
    return this.prisma.$queryRaw<
      { id: number; nombre: string; genero: string; duracion: number; fecha: Date }[]
    >`SELECT * FROM serie_summary`;
  }

  findOne(id: number) {
    return this.prisma.serie.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateSerieDto) {
    return this.prisma.serie.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.serie.delete({ where: { id } });
  }
}
