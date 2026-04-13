import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import type { PrismaService } from '../../prisma/prisma.service';

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  genSalt: jest.fn(),
  hash: jest.fn(),
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const bcrypt = require('bcryptjs') as {
  compare: jest.Mock;
  genSalt: jest.Mock;
  hash: jest.Mock;
};

describe('UsersService.changePassword', () => {
  let service: UsersService;
  const prisma = {
    systemUser: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  } as unknown as PrismaService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new UsersService(prisma);
    bcrypt.genSalt.mockResolvedValue('salt');
    bcrypt.hash.mockResolvedValue('new-hash');
  });

  it('throws NotFoundException when user missing', async () => {
    (prisma.systemUser.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(
      service.changePassword(1, { oldPassword: 'old', newPassword: 'NewPass1' }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('throws BadRequestException when account has no local password (Google-only)', async () => {
    (prisma.systemUser.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      passwordHash: null,
    });

    await expect(
      service.changePassword(1, { oldPassword: 'x', newPassword: 'NewPass1' }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('throws BadRequestException when old password is wrong', async () => {
    (prisma.systemUser.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      passwordHash: 'stored',
    });
    bcrypt.compare.mockResolvedValue(false);

    await expect(
      service.changePassword(1, { oldPassword: 'wrong', newPassword: 'NewPass1' }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('updates password hash and returns envelope on success', async () => {
    (prisma.systemUser.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      passwordHash: 'stored',
    });
    bcrypt.compare.mockResolvedValue(true);
    (prisma.systemUser.update as jest.Mock).mockResolvedValue({});

    const result = await service.changePassword(1, {
      oldPassword: 'OldPass1',
      newPassword: 'NewPass2',
    });

    expect(result).toMatchObject({
      statusCode: 200,
      message: 'Đổi mật khẩu thành công',
      data: null,
      meta: null,
    });
    expect(prisma.systemUser.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { passwordHash: 'new-hash' },
    });
  });
});
