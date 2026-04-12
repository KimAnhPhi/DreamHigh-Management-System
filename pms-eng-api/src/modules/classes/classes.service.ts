import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ClassesService {
  constructor(private prisma: PrismaService) {}

  async getClassDetails(classCode: string) {
    const classInfo = await this.prisma.trainingClass.findUnique({
      where: { classCode },
      include: {
        course: true,
        teacher: true,
        sessions: {
          include: {
            room: true,
            attendances: true,
          },
          orderBy: {
            startTime: 'asc',
          },
        },
        exams: {
          include: {
            grades: true,
          },
        },
        enrollments: {
          include: {
            student: true,
          },
        },
      },
    });

    if (!classInfo) {
      throw new NotFoundException(`Lớp học mã ${classCode} không tồn tại`);
    }

    return {
      statusCode: 200,
      message: 'Lấy thông tin chi tiết lớp thành công',
      data: classInfo,
      meta: null,
    };
  }
}
