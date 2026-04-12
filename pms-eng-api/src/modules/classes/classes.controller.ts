import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('classes')
@UseGuards(JwtAuthGuard)
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get(':code')
  getClassDetails(@Param('code') code: string) {
    return this.classesService.getClassDetails(code);
  }
}
