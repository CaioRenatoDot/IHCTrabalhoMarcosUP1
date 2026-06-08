-- AlterTable
ALTER TABLE "risk_assessments" ADD COLUMN     "risk_model_version_id" UUID;

-- CreateTable
CREATE TABLE "dataset_references" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "source_type" TEXT NOT NULL,
    "source_url" TEXT NOT NULL,
    "description" TEXT,
    "use_case" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dataset_references_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dataset_feature_mappings" (
    "id" UUID NOT NULL,
    "dataset_reference_id" UUID NOT NULL,
    "project_field_key" TEXT NOT NULL,
    "dataset_field_name" TEXT NOT NULL,
    "mapping_type" TEXT NOT NULL,
    "evidence_strength" TEXT NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dataset_feature_mappings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "risk_model_versions" (
    "id" UUID NOT NULL,
    "version" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "thresholds_json" JSONB NOT NULL,
    "weights_json" JSONB NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "risk_model_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_events" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "event_type" TEXT NOT NULL,
    "ip" TEXT,
    "user_agent" TEXT,
    "details_json" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auth_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assessment_factor_details" (
    "id" UUID NOT NULL,
    "assessment_id" UUID NOT NULL,
    "factor_key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "group_key" TEXT NOT NULL,
    "original_value" TEXT,
    "normalized_value" DOUBLE PRECISION,
    "contribution" DOUBLE PRECISION NOT NULL,
    "impact" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assessment_factor_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dataset_references_slug_key" ON "dataset_references"("slug");

-- CreateIndex
CREATE INDEX "dataset_references_source_type_idx" ON "dataset_references"("source_type");

-- CreateIndex
CREATE INDEX "dataset_references_active_idx" ON "dataset_references"("active");

-- CreateIndex
CREATE INDEX "dataset_feature_mappings_dataset_reference_id_idx" ON "dataset_feature_mappings"("dataset_reference_id");

-- CreateIndex
CREATE INDEX "dataset_feature_mappings_project_field_key_idx" ON "dataset_feature_mappings"("project_field_key");

-- CreateIndex
CREATE UNIQUE INDEX "risk_model_versions_version_key" ON "risk_model_versions"("version");

-- CreateIndex
CREATE INDEX "risk_model_versions_active_idx" ON "risk_model_versions"("active");

-- CreateIndex
CREATE INDEX "auth_events_user_id_idx" ON "auth_events"("user_id");

-- CreateIndex
CREATE INDEX "auth_events_event_type_idx" ON "auth_events"("event_type");

-- CreateIndex
CREATE INDEX "auth_events_created_at_idx" ON "auth_events"("created_at");

-- CreateIndex
CREATE INDEX "assessment_factor_details_assessment_id_idx" ON "assessment_factor_details"("assessment_id");

-- CreateIndex
CREATE INDEX "assessment_factor_details_factor_key_idx" ON "assessment_factor_details"("factor_key");

-- CreateIndex
CREATE INDEX "assessment_factor_details_group_key_idx" ON "assessment_factor_details"("group_key");

-- CreateIndex
CREATE INDEX "risk_assessments_risk_model_version_id_idx" ON "risk_assessments"("risk_model_version_id");

-- AddForeignKey
ALTER TABLE "risk_assessments" ADD CONSTRAINT "risk_assessments_risk_model_version_id_fkey" FOREIGN KEY ("risk_model_version_id") REFERENCES "risk_model_versions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dataset_feature_mappings" ADD CONSTRAINT "dataset_feature_mappings_dataset_reference_id_fkey" FOREIGN KEY ("dataset_reference_id") REFERENCES "dataset_references"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_events" ADD CONSTRAINT "auth_events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_factor_details" ADD CONSTRAINT "assessment_factor_details_assessment_id_fkey" FOREIGN KEY ("assessment_id") REFERENCES "risk_assessments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
