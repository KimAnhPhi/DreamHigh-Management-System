import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  UseGuards,
  Request,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  getProfile(@Request() req: { user: { userId: number } }) {
    return this.usersService.getProfile(req.user.userId);
  }

  @Patch('change-password')
  changePassword(@Request() req: { user: { userId: number } }, @Body() body: ChangePasswordDto) {
    return this.usersService.changePassword(req.user.userId, body);
  }

  @Get('lookup/roles')
  @Roles('ADMIN')
  lookupRoles() {
    return this.usersService.listRolesForAdmin();
  }

  @Get()
  @Roles('ADMIN')
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @Roles('ADMIN')
  create(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Patch(':id')
  @Roles('ADMIN')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(id, body);
  }

  @Patch(':id/roles')
  @Roles('ADMIN')
  updateRoles(
    @Param('id', ParseIntPipe) id: number,
    @Body('roles') roles: string[],
  ) {
    return this.usersService.updateRoles(id, roles);
  }
}
