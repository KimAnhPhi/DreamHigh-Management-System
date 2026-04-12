import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { OAuth2Client, type TokenPayload } from 'google-auth-library';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { toPublicUser } from '../../common/mappers/to-public-user';
import { ensureUniqueUsername } from '../users/username.util';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // 1. Check if user already exists
    const existingUser = await this.prisma.systemUser.findUnique({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new BadRequestException('Email đã được sử dụng. Vui lòng chọn email khác.');
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    // 3. Find default role (STUDENT)
    let defaultRole = await this.prisma.role.findUnique({
      where: { code: 'STUDENT' },
    });

    // If roles are not seeded yet, fallback to a fail-safe or create it dynamically (optional, but finding is better)
    if (!defaultRole) {
      defaultRole = await this.prisma.role.create({
        data: {
          code: 'STUDENT',
          name: 'Học viên',
          description: 'Học viên hệ thống',
        },
      });
    }

    const username = await ensureUniqueUsername(this.prisma, dto.email);

    // 4. Create User and assign Role
    const user = await this.prisma.systemUser.create({
      data: {
        username,
        email: dto.email,
        fullName: dto.fullName,
        passwordHash: hashedPassword,
        userRoles: {
          create: {
            roleId: defaultRole.id,
          },
        },
      },
      include: {
        userRoles: { include: { role: true } },
        userBranches: { include: { branch: true } },
      },
    });

    return {
      statusCode: 201,
      message: 'Đăng ký tài khoản thành công',
      data: toPublicUser(user),
      meta: null,
    };
  }

  async login(dto: LoginDto) {
    // 1. Find user by email including roles
    const user = await this.prisma.systemUser.findUnique({
      where: { email: dto.email },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
        userBranches: { include: { branch: true } },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Thông tin đăng nhập không hợp lệ');
    }

    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedException('Tài khoản đã bị khóa hoặc chưa kích hoạt');
    }

    if (!user.passwordHash) {
      throw new UnauthorizedException(
        'Tài khoản này chỉ đăng nhập bằng Google. Vui lòng dùng nút Đăng nhập Google.',
      );
    }

    // 2. Compare password
    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Thông tin đăng nhập không hợp lệ');
    }

    // 3. Prepare payload for JWT
    const roles = user.userRoles.map(ur => ur.role.code);
    const payload = { 
      sub: user.id, 
      email: user.email, 
      roles 
    };

    // 4. Generate JWT
    const accessToken = this.jwtService.sign(payload);

    return {
      statusCode: 200,
      message: 'Đăng nhập thành công',
      data: {
        accessToken,
        user: toPublicUser(user),
      },
      meta: null,
    };
  }

  private getGoogleOAuthClient(): OAuth2Client {
    const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
    if (!clientId) {
      throw new BadRequestException('Đăng nhập Google chưa được cấu hình trên máy chủ (GOOGLE_CLIENT_ID).');
    }
    return new OAuth2Client(clientId);
  }

  async loginWithGoogle(idToken: string) {
    const audience = process.env.GOOGLE_CLIENT_ID?.trim();
    const client = this.getGoogleOAuthClient();
    let payload: TokenPayload | undefined;
    try {
      const ticket = await client.verifyIdToken({ idToken, audience });
      payload = ticket.getPayload() ?? undefined;
    } catch {
      throw new UnauthorizedException('Phiên đăng nhập Google không hợp lệ hoặc đã hết hạn.');
    }

    if (!payload?.sub || !payload.email) {
      throw new UnauthorizedException('Không lấy được thông tin tài khoản Google.');
    }
    if (payload.email_verified === false) {
      throw new UnauthorizedException('Email Google chưa được xác minh.');
    }

    const googleSub = payload.sub;
    const email = payload.email.trim().toLowerCase();
    const fullName = (payload.name?.trim() || email.split('@')[0]).slice(0, 255);

    let user = await this.prisma.systemUser.findFirst({
      where: {
        OR: [{ googleSub }, { email: { equals: email, mode: 'insensitive' } }],
      },
      include: {
        userRoles: { include: { role: true } },
        userBranches: { include: { branch: true } },
      },
    });

    if (user) {
      if (user.status !== 'ACTIVE') {
        throw new UnauthorizedException('Tài khoản đã bị khóa hoặc chưa kích hoạt');
      }
      if (user.googleSub && user.googleSub !== googleSub) {
        throw new UnauthorizedException('Email này đã liên kết với tài khoản Google khác.');
      }
      if (!user.googleSub) {
        user = await this.prisma.systemUser.update({
          where: { id: user.id },
          data: { googleSub },
          include: {
            userRoles: { include: { role: true } },
            userBranches: { include: { branch: true } },
          },
        });
      }
    } else {
      let defaultRole = await this.prisma.role.findUnique({
        where: { code: 'STUDENT' },
      });
      if (!defaultRole) {
        defaultRole = await this.prisma.role.create({
          data: {
            code: 'STUDENT',
            name: 'Học viên',
            description: 'Học viên hệ thống',
          },
        });
      }
      const username = await ensureUniqueUsername(this.prisma, email);
      user = await this.prisma.systemUser.create({
        data: {
          username,
          email,
          fullName,
          passwordHash: null,
          googleSub,
          userRoles: { create: { roleId: defaultRole.id } },
        },
        include: { userRoles: { include: { role: true } }, userBranches: { include: { branch: true } } },
      });
    }

    const roles = user.userRoles.map((ur) => ur.role.code);
    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      roles,
    });

    return {
      statusCode: 200,
      message: 'Đăng nhập thành công',
      data: {
        accessToken,
        user: toPublicUser(user),
      },
      meta: null,
    };
  }
}
