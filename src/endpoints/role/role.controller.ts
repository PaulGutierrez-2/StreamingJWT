import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  /**
   * Crear rol (solo admin)
   * POST /role
   * Headers: Authorization: Bearer <token_admin>
   * Body:
   * {
   *   "name": "admin"
   * }
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  /**
   * Listar roles (paginación y búsqueda)
   * GET /role?skip=0&take=10&search=admin
   * Headers: Authorization: Bearer <token_admin>
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('search') search?: string,
  ) {
    return this.roleService.findAll({
      skip: skip ? Number(skip) : 0,
      take: take ? Number(take) : 10,
      search,
    });
  }

  /**
   * Actualizar rol (solo admin)
   * PATCH /role/:id
   * Headers: Authorization: Bearer <token_admin>
   * Body:
   * {
   *   "name": "nuevo_rol"
   * }
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  /**
   * Eliminar rol (solo admin)
   * DELETE /role/:id
   * Headers: Authorization: Bearer <token_admin>
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
