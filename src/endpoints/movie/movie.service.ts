import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) { }

  create(data: CreateMovieDto) {
    return this.prisma.movie.create({ data });
  }

  findAll(params: { skip?: number; take?: number; search?: string } = {}) {
    const { skip = 0, take = 10, search } = params;
    return this.prisma.movie.findMany({
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
    >`SELECT * FROM movie_summary`;
  }

  findOne(id: number) {
    return this.prisma.movie.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateMovieDto) {
    return this.prisma.movie.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.movie.delete({ where: { id } });
  }
}
