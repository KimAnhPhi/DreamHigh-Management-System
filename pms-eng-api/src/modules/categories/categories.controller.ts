import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('categories')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('branches')
  findAllBranches() {
    return this.categoriesService.findAllBranches();
  }

  // --- Programs ---
  @Get('programs')
  findAllPrograms(@Query('includeInactive') includeInactive?: string) {
    return this.categoriesService.findAllPrograms(includeInactive === 'true' || includeInactive === '1');
  }

  @Post('programs')
  @Roles('ADMIN', 'MANAGER')
  createProgram(@Body() body: any) {
    return this.categoriesService.createProgram(body);
  }

  @Patch('programs/:id')
  @Roles('ADMIN', 'MANAGER')
  updateProgram(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.categoriesService.updateProgram(id, body);
  }

  @Delete('programs/:id')
  @Roles('ADMIN', 'MANAGER')
  deleteProgram(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.softDeleteProgram(id);
  }

  // --- Levels ---
  @Get('levels')
  findAllLevels(@Query('programId') programId?: string, @Query('includeInactive') includeInactive?: string) {
    const pid = programId && programId.trim() !== '' ? Number(programId) : undefined;
    return this.categoriesService.findAllLevels(
      pid != null && Number.isFinite(pid) ? pid : undefined,
      includeInactive === 'true' || includeInactive === '1',
    );
  }

  @Post('levels')
  @Roles('ADMIN', 'MANAGER')
  createLevel(@Body() body: any) {
    return this.categoriesService.createLevel(body);
  }

  @Patch('levels/:id')
  @Roles('ADMIN', 'MANAGER')
  updateLevel(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.categoriesService.updateLevel(id, body);
  }

  @Delete('levels/:id')
  @Roles('ADMIN', 'MANAGER')
  deleteLevel(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.softDeleteLevel(id);
  }

  // --- Class types ---
  @Get('class-types')
  findAllClassTypes(@Query('includeInactive') includeInactive?: string) {
    return this.categoriesService.findAllClassTypes(includeInactive === 'true' || includeInactive === '1');
  }

  @Post('class-types')
  @Roles('ADMIN', 'MANAGER')
  createClassType(@Body() body: any) {
    return this.categoriesService.createClassType(body);
  }

  @Patch('class-types/:id')
  @Roles('ADMIN', 'MANAGER')
  updateClassType(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.categoriesService.updateClassType(id, body);
  }

  @Delete('class-types/:id')
  @Roles('ADMIN', 'MANAGER')
  deleteClassType(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.softDeleteClassType(id);
  }

  // --- Rooms ---
  @Get('rooms')
  findAllRooms(@Query('branchId') branchId?: string, @Query('includeInactive') includeInactive?: string) {
    const bid = branchId && branchId.trim() !== '' ? Number(branchId) : undefined;
    return this.categoriesService.findAllRooms(
      bid != null && Number.isFinite(bid) ? bid : undefined,
      includeInactive === 'true' || includeInactive === '1',
    );
  }

  @Post('rooms')
  @Roles('ADMIN', 'MANAGER')
  createRoom(@Body() body: any) {
    return this.categoriesService.createRoom(body);
  }

  @Patch('rooms/:id')
  @Roles('ADMIN', 'MANAGER')
  updateRoom(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.categoriesService.updateRoom(id, body);
  }

  @Delete('rooms/:id')
  @Roles('ADMIN', 'MANAGER')
  deleteRoom(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.softDeleteRoom(id);
  }

  // --- Courses ---
  @Get('courses')
  findCourses(@Query() query: Record<string, string | undefined>) {
    return this.categoriesService.findCourses(query);
  }

  @Post('courses')
  @Roles('ADMIN', 'MANAGER')
  createCourse(@Body() body: any) {
    return this.categoriesService.createCourse(body);
  }

  @Patch('courses/:id')
  @Roles('ADMIN', 'MANAGER')
  updateCourse(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.categoriesService.updateCourse(id, body);
  }

  @Delete('courses/:id')
  @Roles('ADMIN', 'MANAGER')
  deleteCourse(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.softDeleteCourse(id);
  }
}
