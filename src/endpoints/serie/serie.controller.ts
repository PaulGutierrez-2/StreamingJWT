import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { SerieService } from './serie.service';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Controller('serie')
export class SerieController {
  constructor(private readonly serieService: SerieService) { }

  /**
   * POST /serie
   * {
   *   "nombre": "Ejemplo",
   *   "tipo": "serie",
   *   "genero": "Drama",
   *   "duracion": 60,
   *   "fecha": "2025-06-08T00:00:00.000Z",
   *   "actores": "Actor 1, Actor 2",
   *   "productora": "Productora X"
   * }
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() createSerieDto: CreateSerieDto) {
    return this.serieService.create(createSerieDto);
  }

  /**
   * GET /serie?skip=0&take=10&search=palabra
   */
  @Get()
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('search') search?: string,
  ) {
    return this.serieService.findAll({
      skip: skip ? Number(skip) : 0,
      take: take ? Number(take) : 10,
      search,
    });
  }

  @Get('summary')
  async getSerieSummary() {
    return this.serieService.findAllSummary();
  }

  // GET /serie/:id

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serieService.findOne(+id);
  }

  /**
   * PATCH /serie/:id
   * {
   *   "nombre": "Nuevo nombre",
   *   "genero": "Nuevo género"
   *   // ...otros campos opcionales
   * }
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSerieDto: UpdateSerieDto) {
    return this.serieService.update(+id, updateSerieDto);
  }


  // DELETE /serie/:id

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serieService.remove(+id);
  }
}
