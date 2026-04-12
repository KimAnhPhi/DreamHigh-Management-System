import { Controller, Post, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('enrollment')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post('leads/:id/convert')
  @Roles('ADMIN', 'MANAGER', 'STAFF')
  convertLeadToStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { branchId: number; dob: string; gender?: string }
  ) {
    return this.enrollmentService.convertLeadToStudent(id, body);
  }

  @Post('placement-test')
  @Roles('ADMIN', 'MANAGER', 'STAFF', 'TEACHER')
  recordPlacementTest(@Body() body: any) {
    return this.enrollmentService.recordPlacementTest(body);
  }
}
