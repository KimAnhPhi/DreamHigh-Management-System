-- Story 2.2: lifecycle status timestamp + audit trail
ALTER TABLE "students" ADD COLUMN "status_changed_at" TIMESTAMP(3);

CREATE TABLE "student_status_history" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "from_status" "StudentStatus",
    "to_status" "StudentStatus" NOT NULL,
    "reason" VARCHAR(2000),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "student_status_history_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "student_status_history_student_id_idx" ON "student_status_history"("student_id");

ALTER TABLE "student_status_history" ADD CONSTRAINT "student_status_history_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;
