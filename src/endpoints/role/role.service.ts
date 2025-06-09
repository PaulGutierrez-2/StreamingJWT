import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateRoleDto) {
    return this.prisma.role.create({ data });
  }

  findAll(params: { skip?: number; take?: number; search?: string } = {}) {
    const { skip = 0, take = 10, search } = params;
    return this.prisma.role.findMany({
      skip,
      take,
      where: search
        ? { name: { contains: search, mode: 'insensitive' } }
        : undefined,
    });
  }

  update(id: number, data: UpdateRoleDto) {
    return this.prisma.role.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.role.delete({ where: { id } });
  }
}
