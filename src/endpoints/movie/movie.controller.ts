import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  /**
   * Crear película (solo admin)
   * POST /movie
   * Headers: Authorization: Bearer <token_admin>
   * Body:
   * {
   *   "nombre": "Ejemplo",
   *   "tipo": "movie",
   *   "genero": "Acción",
   *   "duracion": 120,
   *   "fecha": "2025-06-08T00:00:00.000Z",
   *   "actores": "Actor 1, Actor 2",
   *   "productora": "Productora X"
   * }
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  /**
   * Listar películas (paginación y búsqueda)
   * GET /movie?skip=0&take=10&search=palabra
   * Público
   */
  @Get()
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('search') search?: string,
  ) {
    return this.movieService.findAll({
      skip: skip ? Number(skip) : 0,
      take: take ? Number(take) : 10,
      search,
    });
  }

  @Get('summary')
  async getMovieSummary() {
    return this.movieService.findAllSummary();
  }

  /**
   * Obtener película por ID
   * GET /movie/:id
   * Público
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(+id);
  }

  /**
   * Actualizar película (solo admin)
   * PATCH /movie/:id
   * Headers: Authorization: Bearer <token_admin>
   * Body:
   * {
   *   "nombre": "Nuevo nombre",
   *   "genero": "Nuevo género"
   *   // ...otros campos opcionales
   * }
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(+id, updateMovieDto);
  }

  /**
   * Eliminar película (solo admin)
   * DELETE /movie/:id
   * Headers: Authorization: Bearer <token_admin>
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(+id);
  }
}
