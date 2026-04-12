export type UserStatus = 'Active' | 'Locked' | 'Suspended';

export interface Permission {
  moduleId: string;
  canView: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  canApprove: boolean;
}

export interface SystemRole {
  id: string;
  /** Mã vai trò backend (ADMIN, STAFF, …) — dùng cho gán quyền. */
  code: string;
  name: string;
  description: string;
  permissions: Permission[];
}

export interface SystemUser {
  id: string;
  username: string;
  fullName: string;
  email: string;
  /** SĐT liên hệ (tuỳ chọn). */
  phone?: string;
  roles: string[];
  branchIds: string[];
  lastLogin?: string;
  status: UserStatus;
}

export interface Branch {
  id: string;
  code: string;
  name: string;
  hotline: string;
  email: string;
  address: string;
  status: string;
}

export type AuditAction = 'Create' | 'Update' | 'Delete' | 'Approve' | 'Login';

export interface ActivityLog {
  id: string;
  timestamp: string;
  username: string;
  userId: string;
  action: AuditAction;
  description: string;
  moduleId: string;
  ipAddress: string;
  device: string;
}

export type MessageType = 'success' | 'error' | 'warning';

export interface AdminMessage {
  code: string;
  text: string;
  type: MessageType;
}
