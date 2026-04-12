import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ClassesModule } from './modules/classes/classes.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { EnrollmentModule } from './modules/enrollment/enrollment.module';
import { LeadsModule } from './modules/leads/leads.module';
import { StudentsModule } from './modules/students/students.module';
import { AuditModule } from './modules/audit/audit.module';

import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { AuditInterceptor } from './common/interceptors/audit.interceptor';
import { RolesGuard } from './modules/auth/guards/roles.guard';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    ClassesModule,
    CategoriesModule,
    AuditModule,
    LeadsModule,
    StudentsModule,
    EnrollmentModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
