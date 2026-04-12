import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaService) {}

  async findAll(branchId?: number) {
    return this.prisma.lead.findMany({
      where: branchId
        ? { assignedUser: { userBranches: { some: { branchId } } } }
        : {},
      include: { assignedUser: true, convertedStudent: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const lead = await this.prisma.lead.findUnique({
      where: { id },
      include: { assignedUser: true, convertedStudent: true },
    });
    if (!lead) throw new NotFoundException('Lead không tồn tại');
    return lead;
  }

  async create(data: any) {
    return this.prisma.lead.create({
      data: {
        ...data,
        status: data.status || 'NEW',
      },
    });
  }

  async update(id: number, data: any) {
    return this.prisma.lead.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.lead.delete({
      where: { id },
    });
  }
}
