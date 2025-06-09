import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  /**
   *  POST /content
   * {
   *   "nombre": "Ejemplo",
   *   "tipo": "pelicula",
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
  create(@Body() createContentDto: CreateContentDto) {
    return this.contentService.create(createContentDto);
  }
  
  //  GET /content?skip=0&take=10&search=palabra
  @Get()
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('search') search?: string,
  ) {
    return this.contentService.findAll({
      skip: skip ? Number(skip) : 0,
      take: take ? Number(take) : 10,
      search,
    });
  }

  @Get('summary')
  async getContentSummary() {
    return this.contentService.findAllSummary();
  }

  // GET /content/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentService.findOne(+id);
  }

  /**
   * PATCH /content/:id
   * {
   *   "nombre": "Nuevo nombre",
   *   "genero": "Nuevo género"
   *   // ...otros campos opcionales
   * }
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentService.update(+id, updateContentDto);
  }

  // DELETE /content/:id
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentService.remove(+id);
  }
}
