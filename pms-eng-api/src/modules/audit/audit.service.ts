import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const logs = await this.prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: {
        user: {
          select: {
            fullName: true,
            email: true,
          },
        },
      },
    });

    return {
      statusCode: 200,
      message: 'Lấy nhật ký hệ thống thành công',
      data: logs,
      meta: {
        total: logs.length,
      },
    };
  }
}
