import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}

  create(data: CreatePermissionDto) {
    return this.prisma.permission.create({ data });
  }

  findAll(params: { skip?: number; take?: number; search?: string } = {}) {
    const { skip = 0, take = 10, search } = params;
    return this.prisma.permission.findMany({
      skip,
      take,
      where: search
        ? { name: { contains: search, mode: 'insensitive' } }
        : undefined,
    });
  }

  update(id: number, data: UpdatePermissionDto) {
    return this.prisma.permission.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.permission.delete({ where: { id } });
  }
}
