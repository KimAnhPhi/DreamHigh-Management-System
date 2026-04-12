import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StudentStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateStudentStatusDto } from './dto/update-student-status.dto';
import { canTransition, getAllowedTargets } from './state-machine/student-status.machine';

function normalizePhone(phone: string | undefined | null): string {
  if (!phone) return '';
  return phone.replace(/\s+/g, '').trim();
}

const studentDetailInclude = {
  parent: true,
  classEnrollments: {
    include: { trainingClass: true },
  },
  grades: {
    include: { exam: true },
  },
  attendances: {
    include: { session: true },
  },
  statusHistory: {
    orderBy: { createdAt: 'desc' as const },
    take: 10,
  },
};

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query?: any) {
    const { branchId, search } = query || {};

    return this.prisma.student.findMany({
      where: {
        AND: [
          branchId ? { classEnrollments: { some: { trainingClass: { branchId } } } } : {},
          search
            ? {
                OR: [
                  { fullName: { contains: search, mode: 'insensitive' } },
                  { studentCode: { contains: search, mode: 'insensitive' } },
                  { phone: { contains: search } },
                  { parent: { phone: { contains: search } } },
                ],
              }
            : {},
        ],
      },
      include: {
        parent: true,
        classEnrollments: {
          include: { trainingClass: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const student = await this.prisma.student.findUnique({
      where: { id },
      include: studentDetailInclude,
    });
    if (!student) throw new NotFoundException('Học viên không tồn tại');
    return {
      ...student,
      allowedTransitions: getAllowedTargets(student.status),
    };
  }

  async create(data: any) {
    const parentCreate = data?.parent?.create;
    if (parentCreate?.phone) {
      const p = normalizePhone(parentCreate.phone);
      if (p) {
        const existingParent = await this.prisma.parent.findFirst({
          where: { phone: p },
        });
        if (existingParent) {
          throw new ConflictException({
            statusCode: 409,
            message: 'SĐT phụ huynh đã tồn tại trong hệ thống',
            data: { existingParentId: existingParent.id },
          });
        }
      }
    }

    if (data?.phone) {
      const p = normalizePhone(data.phone);
      if (p) {
        const existingStudent = await this.prisma.student.findFirst({
          where: { phone: p },
        });
        if (existingStudent) {
          throw new ConflictException({
            statusCode: 409,
            message: 'SĐT học viên đã tồn tại',
            data: { existingStudentId: existingStudent.id },
          });
        }
      }
    }

    if (data?.parent?.create?.phone) {
      data.parent.create = {
        ...data.parent.create,
        phone: normalizePhone(data.parent.create.phone) || data.parent.create.phone,
      };
    }
    if (data?.phone !== undefined && data.phone !== null && String(data.phone).trim() !== '') {
      const np = normalizePhone(String(data.phone));
      data.phone = np || null;
    }

    return this.prisma.student.create({
      data: {
        ...data,
        statusChangedAt: new Date(),
      },
      include: { parent: true },
    });
  }

  async update(id: number, data: any) {
    if (data?.status !== undefined) {
      throw new BadRequestException('Dùng PATCH /students/:id/status để đổi trạng thái lộ trình.');
    }
    return this.prisma.student.update({
      where: { id },
      data,
      include: { parent: true },
    });
  }

  async updateStatus(id: number, dto: UpdateStudentStatusDto) {
    const student = await this.prisma.student.findUnique({ where: { id } });
    if (!student) throw new NotFoundException('Học viên không tồn tại');

    const from = student.status;
    const to = dto.targetStatus;

    if (from === to) {
      throw new BadRequestException('Học viên đã ở trạng thái này.');
    }
    if (!canTransition(from, to)) {
      throw new BadRequestException(
        'Chuyển trạng thái không hợp lệ (ví dụ: không thể tốt nghiệp trực tiếp từ Bảo lưu — cần chuyển về Đang học trước).',
      );
    }

    const now = new Date();

    return this.prisma.$transaction(async (tx) => {
      await tx.studentStatusHistory.create({
        data: {
          studentId: id,
          fromStatus: from,
          toStatus: to,
          reason: dto.reason ?? null,
        },
      });

      const updated = await tx.student.update({
        where: { id },
        data: {
          status: to,
          statusChangedAt: now,
        },
        include: studentDetailInclude,
      });

      return {
        ...updated,
        allowedTransitions: getAllowedTargets(updated.status),
      };
    });
  }

  async delete(id: number) {
    const s = await this.prisma.student.findUnique({ where: { id } });
    if (!s) throw new NotFoundException('Học viên không tồn tại');
    if (s.status === StudentStatus.DROPPED) {
      return this.findOne(id);
    }
    return this.updateStatus(id, {
      targetStatus: StudentStatus.DROPPED,
      reason: 'Đánh dấu nghỉ học (admin)',
    });
  }

  // --- Parent management ---
  async findAllParents(search?: string) {
    return this.prisma.parent.findMany({
      where: search
        ? {
            OR: [
              { fullName: { contains: search, mode: 'insensitive' } },
              { phone: { contains: search } },
            ],
          }
        : {},
      include: { students: true },
    });
  }
}
