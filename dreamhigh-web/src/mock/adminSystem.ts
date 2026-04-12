import type { ActivityLog, Branch, Permission, SystemRole, SystemUser } from '../types/adminSystem';
import { MODULES } from '../pages/Dashboard/dashboardConstants';

const fullMatrix: Permission[] = MODULES.map((m) => ({
  moduleId: m.id,
  canView: true,
  canCreate: true,
  canUpdate: true,
  canDelete: true,
  canApprove: true,
}));

export const MOCK_SYSTEM_USERS: SystemUser[] = [
  {
    id: '1',
    username: 'admin.dh',
    fullName: 'Nguyễn Quản Trị',
    email: 'admin@dreamhigh.edu.vn',
    roles: ['ADMIN'],
    branchIds: ['b1', 'b2'],
    lastLogin: '29/03/2026 08:42',
    status: 'Active',
  },
  {
    id: '2',
    username: 'manager.hn',
    fullName: 'Trần Thị Điều Hành',
    email: 'manager.hn@dreamhigh.edu.vn',
    roles: ['MANAGER'],
    branchIds: ['b1'],
    lastLogin: '28/03/2026 17:15',
    status: 'Active',
  },
  {
    id: '3',
    username: 'staff.cskh',
    fullName: 'Lê Văn Tư Vấn',
    email: 'cskh@dreamhigh.edu.vn',
    roles: ['STAFF'],
    branchIds: ['b2'],
    status: 'Locked',
  },
];

export const MOCK_ROLES: SystemRole[] = [
  {
    id: 'r1',
    code: 'ADMIN',
    name: 'Super Admin',
    description: 'Toàn quyền cấu hình hệ thống',
    permissions: fullMatrix,
  },
  {
    id: 'r2',
    code: 'MANAGER',
    name: 'Quản lý chi nhánh',
    description: 'Vận hành CRM, lớp học, tài chính tại chi nhánh',
    permissions: [
      {
        moduleId: 'leads',
        canView: true,
        canCreate: true,
        canUpdate: true,
        canDelete: false,
        canApprove: true,
      },
      {
        moduleId: 'courses',
        canView: true,
        canCreate: false,
        canUpdate: true,
        canDelete: false,
        canApprove: false,
      },
      {
        moduleId: 'students',
        canView: true,
        canCreate: true,
        canUpdate: true,
        canDelete: false,
        canApprove: false,
      },
    ],
  },
  {
    id: 'r3',
    code: 'STAFF',
    name: 'Tư vấn viên',
    description: 'Leads và học viên — không xóa, không duyệt thanh toán',
    permissions: [
      {
        moduleId: 'leads',
        canView: true,
        canCreate: true,
        canUpdate: true,
        canDelete: false,
        canApprove: false,
      },
      {
        moduleId: 'students',
        canView: true,
        canCreate: false,
        canUpdate: true,
        canDelete: false,
        canApprove: false,
      },
    ],
  },
];

export const MOCK_BRANCHES: Branch[] = [
  {
    id: 'b1',
    code: 'HN-01',
    name: 'DreamHigh Hà Nội — Cầu Giấy',
    hotline: '0243 456 789',
    email: 'hn@dreamhigh.edu.vn',
    address: 'Tầng 3, tòa nhà X, quận Cầu Giấy',
    status: 'Hoạt động',
  },
  {
    id: 'b2',
    code: 'HCM-01',
    name: 'DreamHigh TP.HCM — Quận 1',
    hotline: '0283 987 654',
    email: 'hcm@dreamhigh.edu.vn',
    address: 'Lầu 2, đường Y, Quận 1',
    status: 'Hoạt động',
  },
];

export const MOCK_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'l1',
    timestamp: '2026-03-29T09:12:00',
    username: 'admin.dh',
    userId: '1',
    action: 'Create',
    description: 'Tạo tài khoản mới: staff.cskh',
    moduleId: 'admin',
    ipAddress: '192.168.1.10',
    device: 'Chrome / macOS',
  },
  {
    id: 'l2',
    timestamp: '2026-03-28T16:40:00',
    username: 'manager.hn',
    userId: '2',
    action: 'Approve',
    description: 'Duyệt chuyển đổi Lead → Học viên #4521',
    moduleId: 'leads',
    ipAddress: '10.0.0.44',
    device: 'Edge / Windows',
  },
];
