-- Story 1.2: Loại lớp (catalog)
CREATE TABLE "class_types" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "status" "CatalogStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "class_types_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "class_types_code_key" ON "class_types"("code");
