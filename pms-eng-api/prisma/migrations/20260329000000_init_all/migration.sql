-- ============================================================
-- DreamHigh — Quản lý Đào tạo Trung tâm Tiếng Anh
-- Migration: 20260329000000_init_all
-- Source ERD: docs-BA/ERD/ba-erd-QuanLyDaoTao_TrungTamTiengAnh.md (v1.2.0)
-- Provider: PostgreSQL
-- ============================================================

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------

CREATE TYPE "BranchStatus" AS ENUM ('ACTIVE', 'INACTIVE');
CREATE TYPE "RoomStatus" AS ENUM ('AVAILABLE', 'MAINTENANCE', 'INACTIVE');
CREATE TYPE "SystemUserStatus" AS ENUM ('ACTIVE', 'INACTIVE');
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'CONVERTED', 'LOST');
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');
CREATE TYPE "StudentStatus" AS ENUM ('ACTIVE', 'RESERVED', 'DROPPED', 'GRADUATED');
CREATE TYPE "CatalogStatus" AS ENUM ('ACTIVE', 'INACTIVE');
CREATE TYPE "TrainingClassStatus" AS ENUM ('PLANNED', 'ACTIVE', 'COMPLETED', 'CANCELLED');
CREATE TYPE "ClassStudentStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'DROPPED', 'TRANSFERRED');
CREATE TYPE "SessionStatus" AS ENUM ('NORMAL', 'RESCHEDULED', 'CANCELLED');
CREATE TYPE "AttendanceStatus" AS ENUM ('PRESENT', 'ABSENT_EXCUSED', 'ABSENT_UNEXCUSED');
CREATE TYPE "InvoicePaymentStatus" AS ENUM ('PENDING', 'PARTIAL', 'COMPLETED');
CREATE TYPE "PermissionAction" AS ENUM ('CREATE', 'READ', 'UPDATE', 'DELETE');
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'BANK_TRANSFER', 'CARD', 'E_WALLET', 'OTHER');

-- ---------------------------------------------------------------------------
-- Organization
-- ---------------------------------------------------------------------------

CREATE TABLE "branches" (
    "id"         SERIAL          PRIMARY KEY,
    "code"       VARCHAR(50)     NOT NULL,
    "name"       VARCHAR(255)    NOT NULL,
    "address"    VARCHAR(500),
    "phone"      VARCHAR(50),
    "status"     "BranchStatus"  NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    CONSTRAINT "branches_code_key" UNIQUE ("code")
);

CREATE TABLE "rooms" (
    "id"         SERIAL         PRIMARY KEY,
    "branch_id"  INTEGER        NOT NULL,
    "room_code"  VARCHAR(50)    NOT NULL,
    "name"       VARCHAR(255),
    "capacity"   INTEGER        NOT NULL,
    "status"     "RoomStatus"   NOT NULL DEFAULT 'AVAILABLE',
    CONSTRAINT "rooms_branch_id_room_code_key" UNIQUE ("branch_id", "room_code"),
    CONSTRAINT "rooms_branch_id_fkey" FOREIGN KEY ("branch_id")
        REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "rooms_branch_id_idx" ON "rooms"("branch_id");

-- ---------------------------------------------------------------------------
-- RBAC
-- ---------------------------------------------------------------------------

CREATE TABLE "system_users" (
    "id"             SERIAL              PRIMARY KEY,
    "full_name"      VARCHAR(255)        NOT NULL,
    "email"          VARCHAR(255)        NOT NULL,
    "password_hash"  VARCHAR(255)        NOT NULL,
    "is_super_admin" BOOLEAN             NOT NULL DEFAULT FALSE,
    "status"         "SystemUserStatus"  NOT NULL DEFAULT 'ACTIVE',
    "created_at"     TIMESTAMPTZ         NOT NULL DEFAULT NOW(),
    "updated_at"     TIMESTAMPTZ,
    CONSTRAINT "system_users_email_key" UNIQUE ("email")
);

CREATE TABLE "roles" (
    "id"          SERIAL          PRIMARY KEY,
    "code"        VARCHAR(64)     NOT NULL,
    "name"        VARCHAR(255)    NOT NULL,
    "description" VARCHAR(1000),
    CONSTRAINT "roles_code_key" UNIQUE ("code")
);

CREATE TABLE "permissions" (
    "id"          SERIAL              PRIMARY KEY,
    "resource"    VARCHAR(100)        NOT NULL,
    "action"      "PermissionAction"  NOT NULL,
    "description" VARCHAR(500),
    CONSTRAINT "permissions_resource_action_key" UNIQUE ("resource", "action")
);

CREATE TABLE "role_permissions" (
    "role_id"       INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,
    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("role_id", "permission_id"),
    CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id")
        REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "role_permissions_permission_id_fkey" FOREIGN KEY ("permission_id")
        REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "user_roles" (
    "user_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("user_id", "role_id"),
    CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id")
        REFERENCES "system_users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id")
        REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "user_branches" (
    "user_id"   INTEGER NOT NULL,
    "branch_id" INTEGER NOT NULL,
    CONSTRAINT "user_branches_pkey" PRIMARY KEY ("user_id", "branch_id"),
    CONSTRAINT "user_branches_user_id_fkey" FOREIGN KEY ("user_id")
        REFERENCES "system_users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "user_branches_branch_id_fkey" FOREIGN KEY ("branch_id")
        REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "user_branches_branch_id_idx" ON "user_branches"("branch_id");

-- ---------------------------------------------------------------------------
-- CRM & Students
-- ---------------------------------------------------------------------------

CREATE TABLE "parents" (
    "id"        SERIAL       PRIMARY KEY,
    "full_name" VARCHAR(255) NOT NULL,
    "phone"     VARCHAR(50)  NOT NULL,
    "email"     VARCHAR(255),
    "address"   VARCHAR(500),
    "id_number" VARCHAR(32)
);

CREATE TABLE "students" (
    "id"           SERIAL          PRIMARY KEY,
    "student_code" VARCHAR(50)     NOT NULL,
    "full_name"    VARCHAR(255)    NOT NULL,
    "dob"          DATE            NOT NULL,
    "gender"       "Gender",
    "phone"        VARCHAR(50),
    "email"        VARCHAR(255),
    "parent_id"    INTEGER         NOT NULL,
    "status"       "StudentStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at"   TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    CONSTRAINT "students_student_code_key" UNIQUE ("student_code"),
    CONSTRAINT "students_parent_id_fkey" FOREIGN KEY ("parent_id")
        REFERENCES "parents"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX "students_parent_id_idx" ON "students"("parent_id");

CREATE TABLE "leads" (
    "id"                   SERIAL        PRIMARY KEY,
    "full_name"            VARCHAR(255)  NOT NULL,
    "phone"                VARCHAR(50)   NOT NULL,
    "email"                VARCHAR(255),
    "source"               VARCHAR(100),
    "status"               "LeadStatus"  NOT NULL DEFAULT 'NEW',
    "assigned_user_id"     INTEGER,
    "notes"                VARCHAR(2000),
    "created_at"           TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    "converted_student_id" INTEGER,
    CONSTRAINT "leads_converted_student_id_key" UNIQUE ("converted_student_id"),
    CONSTRAINT "leads_assigned_user_id_fkey" FOREIGN KEY ("assigned_user_id")
        REFERENCES "system_users"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "leads_converted_student_id_fkey" FOREIGN KEY ("converted_student_id")
        REFERENCES "students"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE INDEX "leads_assigned_user_id_idx" ON "leads"("assigned_user_id");
CREATE INDEX "leads_status_idx" ON "leads"("status");

-- ---------------------------------------------------------------------------
-- Academic Catalog
-- ---------------------------------------------------------------------------

CREATE TABLE "programs" (
    "id"          SERIAL          PRIMARY KEY,
    "code"        VARCHAR(50)     NOT NULL,
    "name"        VARCHAR(255)    NOT NULL,
    "description" VARCHAR(2000),
    "status"      "CatalogStatus" NOT NULL DEFAULT 'ACTIVE',
    CONSTRAINT "programs_code_key" UNIQUE ("code")
);

CREATE TABLE "levels" (
    "id"         SERIAL       PRIMARY KEY,
    "program_id" INTEGER      NOT NULL,
    "code"       VARCHAR(50)  NOT NULL,
    "name"       VARCHAR(255) NOT NULL,
    "sort_order" INTEGER      NOT NULL,
    CONSTRAINT "levels_program_id_code_key" UNIQUE ("program_id", "code"),
    CONSTRAINT "levels_program_id_fkey" FOREIGN KEY ("program_id")
        REFERENCES "programs"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "levels_program_id_idx" ON "levels"("program_id");

CREATE TABLE "courses" (
    "id"             SERIAL          PRIMARY KEY,
    "level_id"       INTEGER         NOT NULL,
    "code"           VARCHAR(50)     NOT NULL,
    "name"           VARCHAR(255)    NOT NULL,
    "total_sessions" INTEGER         NOT NULL,
    "duration_weeks" INTEGER,
    "tuition_fee"    DECIMAL(12, 2),
    "status"         "CatalogStatus" NOT NULL DEFAULT 'ACTIVE',
    CONSTRAINT "courses_code_key" UNIQUE ("code"),
    CONSTRAINT "courses_level_id_fkey" FOREIGN KEY ("level_id")
        REFERENCES "levels"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "courses_level_id_idx" ON "courses"("level_id");

-- ---------------------------------------------------------------------------
-- Classes & Sessions
-- ---------------------------------------------------------------------------

CREATE TABLE "classes" (
    "id"           SERIAL                  PRIMARY KEY,
    "course_id"    INTEGER                 NOT NULL,
    "branch_id"    INTEGER                 NOT NULL,
    "teacher_id"   INTEGER                 NOT NULL,
    "class_code"   VARCHAR(50)             NOT NULL,
    "max_students" INTEGER                 NOT NULL,
    "start_date"   DATE                    NOT NULL,
    "end_date"     DATE,
    "status"       "TrainingClassStatus"   NOT NULL DEFAULT 'PLANNED',
    CONSTRAINT "classes_class_code_key" UNIQUE ("class_code"),
    CONSTRAINT "classes_course_id_fkey" FOREIGN KEY ("course_id")
        REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "classes_branch_id_fkey" FOREIGN KEY ("branch_id")
        REFERENCES "branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "classes_teacher_id_fkey" FOREIGN KEY ("teacher_id")
        REFERENCES "system_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX "classes_branch_id_idx"  ON "classes"("branch_id");
CREATE INDEX "classes_course_id_idx"  ON "classes"("course_id");
CREATE INDEX "classes_teacher_id_idx" ON "classes"("teacher_id");

CREATE TABLE "class_students" (
    "id"          SERIAL                  PRIMARY KEY,
    "class_id"    INTEGER                 NOT NULL,
    "student_id"  INTEGER                 NOT NULL,
    "enrolled_at" TIMESTAMPTZ             NOT NULL DEFAULT NOW(),
    "status"      "ClassStudentStatus"    NOT NULL DEFAULT 'ACTIVE',
    CONSTRAINT "class_students_class_id_student_id_key" UNIQUE ("class_id", "student_id"),
    CONSTRAINT "class_students_class_id_fkey" FOREIGN KEY ("class_id")
        REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "class_students_student_id_fkey" FOREIGN KEY ("student_id")
        REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "class_students_student_id_idx" ON "class_students"("student_id");

CREATE TABLE "sessions" (
    "id"         SERIAL          PRIMARY KEY,
    "class_id"   INTEGER         NOT NULL,
    "room_id"    INTEGER         NOT NULL,
    "start_time" TIMESTAMPTZ     NOT NULL,
    "end_time"   TIMESTAMPTZ     NOT NULL,
    "status"     "SessionStatus" NOT NULL DEFAULT 'NORMAL',
    "topic_note" VARCHAR(1000),
    CONSTRAINT "sessions_class_id_fkey" FOREIGN KEY ("class_id")
        REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "sessions_room_id_fkey" FOREIGN KEY ("room_id")
        REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX "sessions_class_id_idx"   ON "sessions"("class_id");
CREATE INDEX "sessions_room_id_idx"    ON "sessions"("room_id");
CREATE INDEX "sessions_start_time_idx" ON "sessions"("start_time");

CREATE TABLE "attendances" (
    "id"         SERIAL             PRIMARY KEY,
    "session_id" INTEGER            NOT NULL,
    "student_id" INTEGER            NOT NULL,
    "status"     "AttendanceStatus" NOT NULL,
    "note"       VARCHAR(500),
    CONSTRAINT "attendances_session_id_student_id_key" UNIQUE ("session_id", "student_id"),
    CONSTRAINT "attendances_session_id_fkey" FOREIGN KEY ("session_id")
        REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "attendances_student_id_fkey" FOREIGN KEY ("student_id")
        REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "attendances_student_id_idx" ON "attendances"("student_id");

-- ---------------------------------------------------------------------------
-- Exams & Grades
-- ---------------------------------------------------------------------------

CREATE TABLE "exams" (
    "id"             SERIAL          PRIMARY KEY,
    "class_id"       INTEGER         NOT NULL,
    "title"          VARCHAR(255)    NOT NULL,
    "exam_type"      VARCHAR(50),
    "scheduled_at"   TIMESTAMPTZ     NOT NULL,
    "max_score"      DECIMAL(10, 2)  NOT NULL,
    "weight_percent" DECIMAL(5, 2),
    CONSTRAINT "exams_class_id_fkey" FOREIGN KEY ("class_id")
        REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "exams_class_id_idx" ON "exams"("class_id");

CREATE TABLE "grades" (
    "id"          SERIAL          PRIMARY KEY,
    "exam_id"     INTEGER         NOT NULL,
    "student_id"  INTEGER         NOT NULL,
    "score"       DECIMAL(10, 2)  NOT NULL,
    "grade_label" VARCHAR(20),
    "remarks"     VARCHAR(1000),
    CONSTRAINT "grades_exam_id_student_id_key" UNIQUE ("exam_id", "student_id"),
    CONSTRAINT "grades_exam_id_fkey" FOREIGN KEY ("exam_id")
        REFERENCES "exams"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "grades_student_id_fkey" FOREIGN KEY ("student_id")
        REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "grades_student_id_idx" ON "grades"("student_id");

-- ---------------------------------------------------------------------------
-- Finance
-- ---------------------------------------------------------------------------

CREATE TABLE "invoices" (
    "id"              SERIAL                  PRIMARY KEY,
    "invoice_number"  VARCHAR(50)             NOT NULL,
    "student_id"      INTEGER                 NOT NULL,
    "class_id"        INTEGER,
    "issue_date"      DATE                    NOT NULL,
    "due_date"        DATE,
    "total_amount"    DECIMAL(12, 2)          NOT NULL,
    "discount_amount" DECIMAL(12, 2),
    "final_amount"    DECIMAL(12, 2)          NOT NULL,
    "payment_status"  "InvoicePaymentStatus"  NOT NULL DEFAULT 'PENDING',
    "notes"           VARCHAR(2000),
    CONSTRAINT "invoices_invoice_number_key" UNIQUE ("invoice_number"),
    CONSTRAINT "invoices_student_id_fkey" FOREIGN KEY ("student_id")
        REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "invoices_class_id_fkey" FOREIGN KEY ("class_id")
        REFERENCES "classes"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE INDEX "invoices_student_id_idx"     ON "invoices"("student_id");
CREATE INDEX "invoices_class_id_idx"       ON "invoices"("class_id");
CREATE INDEX "invoices_payment_status_idx" ON "invoices"("payment_status");

CREATE TABLE "payments" (
    "id"              SERIAL           PRIMARY KEY,
    "invoice_id"      INTEGER          NOT NULL,
    "amount"          DECIMAL(12, 2)   NOT NULL,
    "payment_method"  "PaymentMethod"  NOT NULL,
    "paid_at"         TIMESTAMPTZ      NOT NULL,
    "transaction_ref" VARCHAR(100),
    "notes"           VARCHAR(1000),
    CONSTRAINT "payments_invoice_id_fkey" FOREIGN KEY ("invoice_id")
        REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "payments_invoice_id_idx" ON "payments"("invoice_id");
CREATE INDEX "payments_paid_at_idx"    ON "payments"("paid_at");
