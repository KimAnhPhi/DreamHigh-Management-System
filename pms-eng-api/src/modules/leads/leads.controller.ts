import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('leads')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get()
  @Roles('ADMIN', 'MANAGER', 'STAFF')
  findAll(@Query('branchId') branchId?: string) {
    return this.leadsService.findAll(branchId ? +branchId : undefined);
  }

  @Get(':id')
  @Roles('ADMIN', 'MANAGER', 'STAFF')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.leadsService.findOne(id);
  }

  @Post()
  @Roles('ADMIN', 'MANAGER', 'STAFF')
  create(@Body() body: any) {
    return this.leadsService.create(body);
  }

  @Patch(':id')
  @Roles('ADMIN', 'MANAGER', 'STAFF')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.leadsService.update(id, body);
  }

  @Delete(':id')
  @Roles('ADMIN', 'MANAGER')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.leadsService.delete(id);
  }
}
