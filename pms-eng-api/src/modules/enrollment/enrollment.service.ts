import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EnrollmentService {
  constructor(private prisma: PrismaService) {}

  async convertLeadToStudent(leadId: number, data: { branchId: number; dob: string; gender?: any }) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Get Lead
      const lead = await tx.lead.findUnique({
        where: { id: leadId },
      });
      if (!lead) throw new NotFoundException('Lead không tồn tại');
      if (lead.status === 'CONVERTED') throw new BadRequestException('Lead này đã được chuyển đổi thành học viên');

      // 2. Create or Find Parent (based on phone)
      let parent = await tx.parent.findFirst({
        where: { phone: lead.phone },
      });

      if (!parent) {
        parent = await tx.parent.create({
          data: {
            fullName: `PH ${lead.fullName}`, // Default parent name
            phone: lead.phone,
            email: lead.email,
          },
        });
      }

      // 3. Create Student
      const studentCount = await tx.student.count();
      const studentCode = `ST${1000 + studentCount + 1}`;

      const student = await tx.student.create({
        data: {
          studentCode,
          fullName: lead.fullName,
          dob: new Date(data.dob),
          gender: data.gender,
          phone: lead.phone,
          email: lead.email,
          parentId: parent.id,
          status: 'ACTIVE',
          statusChangedAt: new Date(),
        },
      });

      // 4. Update Lead status
      await tx.lead.update({
        where: { id: leadId },
        data: {
          status: 'CONVERTED',
          convertedStudentId: student.id,
        },
      });

      return { student, parent };
    });
  }

  // --- Placement Test logic ---
  async recordPlacementTest(data: { studentId: number; classId: number; listening: number; reading: number; writing: number; notes?: string }) {
    const total = data.listening + data.reading + data.writing;
    
    // Suggest level based on score (Hardcoded MVP logic)
    let suggestedLevelCode = 'L1';
    if (total > 80) suggestedLevelCode = 'L4';
    else if (total > 60) suggestedLevelCode = 'L3';
    else if (total > 40) suggestedLevelCode = 'L2';

    return {
      totalScore: total,
      suggestedLevelCode,
      ...data,
    };
  }
}
