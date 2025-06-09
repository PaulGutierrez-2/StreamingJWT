import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  /**
   * Crear usuario (solo admin)
   * POST /user
   * Headers: Authorization: Bearer <token_admin>
   * Body:
   * {
   *   "username": "usuario",
   *   "password": "contraseña"
   * }
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * Listar usuarios (paginación y búsqueda)
   * GET /user?skip=0&take=10&search=usuario
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
    return this.userService.findAll({
      skip: skip ? Number(skip) : 0,
      take: take ? Number(take) : 10,
      search,
    });
  }

  /**
   * Obtener usuario por ID
   * GET /user/:id
   * Headers: Authorization: Bearer <token_admin>
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  /**
   * Actualizar usuario (solo admin)
   * PATCH /user/:id
   * Headers: Authorization: Bearer <token_admin>
   * Body:
   * {
   *   "username": "nuevo_usuario",
   *   "password": "nueva_contraseña"
   * }
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  /**
   * Eliminar usuario (solo admin)
   * DELETE /user/:id
   * Headers: Authorization: Bearer <token_admin>
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
