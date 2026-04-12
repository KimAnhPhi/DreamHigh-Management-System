const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Master Data...');

  // 1. Create Core Roles
  const roles = [
    { code: 'ADMIN', name: 'System Administrator', description: 'Full access to all system features' },
    { code: 'MANAGER', name: 'Center Manager', description: 'Access to operations and reporting' },
    { code: 'STAFF', name: 'Academic Staff', description: 'Access to academic operations' },
    { code: 'TEACHER', name: 'Teacher', description: 'Access to classroom operations and grading' },
    { code: 'STUDENT', name: 'Student', description: 'Access to student portal' },
    { code: 'PARENT', name: 'Parent', description: 'Access to parent portal' },
  ];

  for (const roleDef of roles) {
    await prisma.role.upsert({
      where: { code: roleDef.code },
      update: {},
      create: roleDef,
    });
  }
  
  const adminRole = await prisma.role.findUnique({ where: { code: 'ADMIN' } });

  // 2. System admin (ADMIN + isSuperAdmin). Stored email is lowercase; LoginDto normalizes input to lowercase.
  const adminEmail = 'dreamhigh.edu.ltd@gmail.com';
  const plainTextPassword = 'DreamHigh123@';
  
  // Hash password with bcrypt
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(plainTextPassword, salt);

  const existingAdmin = await prisma.systemUser.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const adminUser = await prisma.systemUser.create({
      data: {
        username: 'admin',
        email: adminEmail,
        fullName: 'Master Administrator',
        passwordHash,
        isSuperAdmin: true,
        status: 'ACTIVE',
      },
    });

    // Assign Role Admin to User
    if (adminRole) {
      await prisma.userRole.create({
        data: {
          userId: adminUser.id,
          roleId: adminRole.id,
        },
      });
      console.log(`✅ Default admin created: ${adminEmail}`);
    }
  } else {
    await prisma.systemUser.update({
      where: { id: existingAdmin.id },
      data: { passwordHash, isSuperAdmin: true },
    });
    if (adminRole) {
      const hasAdminRole = await prisma.userRole.findFirst({
        where: { userId: existingAdmin.id, roleId: adminRole.id },
      });
      if (!hasAdminRole) {
        await prisma.userRole.create({
          data: { userId: existingAdmin.id, roleId: adminRole.id },
        });
      }
    }
    console.log(
      'Default admin already exists. Password, super-admin flag, and ADMIN role synchronized.',
    );
  }

  // 3. Create Default Branch
  const defaultBranch = await prisma.branch.upsert({
    where: { code: 'DREAMHIGH_MAIN' },
    update: {},
    create: {
      code: 'DREAMHIGH_MAIN',
      name: 'DreamHigh Center - Main Branch',
      address: 'Phố Duy Tân, Cầu Giấy, Hà Nội',
      phone: '0988-888-888',
      status: 'ACTIVE',
    },
  });
  console.log(`✅ Default branch confirmed: ${defaultBranch.name}`);

  // 4. Create Default Programs
  const programsDef = [
    { code: 'IELTS_STAND', name: 'IELTS Standard', description: 'Chương trình luyện thi IELTS tiêu chuẩn' },
    { code: 'TOEIC_BRG', name: 'TOEIC Bridge', description: 'Chương trình TOEIC cho người mới bắt đầu' },
  ];

  for (const prog of programsDef) {
    const createdProg = await prisma.program.upsert({
      where: { code: prog.code },
      update: {},
      create: { ...prog, status: 'ACTIVE' },
    });

    // 5. Create Levels for IELTS
    if (prog.code === 'IELTS_STAND') {
      const levelsDef = [
        { code: 'IELTS_FND', name: 'Foundation', sortOrder: 1 },
        { code: 'IELTS_50', name: 'Pre-IELTS 5.0', sortOrder: 2 },
        { code: 'IELTS_65', name: 'Master IELTS 6.5', sortOrder: 3 },
      ];
      for (const lvl of levelsDef) {
        await prisma.level.upsert({
          where: { programId_code: { programId: createdProg.id, code: lvl.code } },
          update: {},
          create: { ...lvl, programId: createdProg.id, status: 'ACTIVE' },
        });
      }
    }
  }
  console.log('✅ Default programs & levels created.');

  // 6. Create Default Rooms
  const roomsDef = [
    { roomCode: 'R101', name: 'Phòng 101 (Lầu 1)', capacity: 20 },
    { roomCode: 'R102', name: 'Phòng 102 (Lầu 1)', capacity: 25 },
    { roomCode: 'LAB_01', name: 'Phòng máy Lab 01', capacity: 15 },
  ];

  for (const room of roomsDef) {
    await prisma.room.upsert({
      where: { branchId_roomCode: { branchId: defaultBranch.id, roomCode: room.roomCode } },
      update: {},
      create: { ...room, branchId: defaultBranch.id, status: 'AVAILABLE' },
    });
  }
  console.log('✅ Default rooms created.');

  // 7. Create Default Training Class for landing page (S101-2023)
  const masterAdmin = await prisma.systemUser.findUnique({ where: { email: 'dreamhigh.edu.ltd@gmail.com' } });
  const ieltsProg = await prisma.program.findUnique({ where: { code: 'IELTS_STAND' } });
  const ieltsLvl = await prisma.level.findFirst({ where: { programId: ieltsProg?.id } });

  if (masterAdmin && ieltsProg && ieltsLvl) {
    const defaultCourse = await prisma.course.upsert({
      where: { code: 'IELTS_FND_COMP' },
      update: {},
      create: {
        levelId: ieltsLvl.id,
        code: 'IELTS_FND_COMP',
        name: 'IELTS Foundation Comprehensive',
        tuitionFee: 5000000,
        totalSessions: 24,
        status: 'ACTIVE',
      },
    });

    const defaultClass = await prisma.trainingClass.upsert({
      where: { classCode: 'S101-2023' },
      update: {},
      create: {
        classCode: 'S101-2023',
        branchId: defaultBranch.id,
        courseId: defaultCourse.id,
        teacherId: masterAdmin.id,
        maxStudents: 20,
        status: 'ACTIVE',
        startDate: new Date(),
      },
    });

    // Get a room
    const defaultRoom = await prisma.room.findFirst({ where: { branchId: defaultBranch.id } });

    // Add a mockup session
    if (defaultRoom) {
      await prisma.session.upsert({
        where: { id: 1 }, 
        update: {},
        create: {
          classId: defaultClass.id,
          roomId: defaultRoom.id,
          startTime: new Date(),
          endTime: new Date(new Date().getTime() + 2 * 60 * 60 * 1000), // +2h
          status: 'NORMAL',
        }
      });
    }
    console.log('✅ Default course & class S101-2023 created for landing page.');
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
