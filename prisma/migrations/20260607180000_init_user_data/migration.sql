-- RiskCare user data migration.
-- Base tables for the user-owned part of the project.

CREATE TABLE "profiles" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "full_name" TEXT NOT NULL,
    "state" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "questionnaire_responses" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "form_version" TEXT NOT NULL,
    "payload_json" JSONB NOT NULL,
    "normalized_snapshot_json" JSONB NOT NULL,
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "questionnaire_responses_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "risk_assessments" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "response_id" UUID NOT NULL,
    "model_version" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "raw_score" INTEGER NOT NULL,
    "classification" TEXT NOT NULL,
    "group_scores_json" JSONB NOT NULL,
    "factor_breakdown_json" JSONB NOT NULL,
    "warnings_json" JSONB NOT NULL,
    "sources_json" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "risk_assessments_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "consent_records" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "consent_type" TEXT NOT NULL,
    "consent_version" TEXT NOT NULL,
    "accepted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip" TEXT,
    "user_agent" TEXT,

    CONSTRAINT "consent_records_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "profiles_user_id_key" ON "profiles"("user_id");
CREATE INDEX "profiles_user_id_idx" ON "profiles"("user_id");

CREATE INDEX "questionnaire_responses_user_id_idx" ON "questionnaire_responses"("user_id");
CREATE INDEX "questionnaire_responses_submitted_at_idx" ON "questionnaire_responses"("submitted_at");

CREATE UNIQUE INDEX "risk_assessments_response_id_key" ON "risk_assessments"("response_id");
CREATE INDEX "risk_assessments_user_id_idx" ON "risk_assessments"("user_id");
CREATE INDEX "risk_assessments_response_id_idx" ON "risk_assessments"("response_id");
CREATE INDEX "risk_assessments_created_at_idx" ON "risk_assessments"("created_at");

CREATE INDEX "consent_records_user_id_idx" ON "consent_records"("user_id");
CREATE INDEX "consent_records_consent_type_idx" ON "consent_records"("consent_type");

ALTER TABLE "questionnaire_responses"
ADD CONSTRAINT "questionnaire_responses_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "profiles"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "risk_assessments"
ADD CONSTRAINT "risk_assessments_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "profiles"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "risk_assessments"
ADD CONSTRAINT "risk_assessments_response_id_fkey"
FOREIGN KEY ("response_id") REFERENCES "questionnaire_responses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "consent_records"
ADD CONSTRAINT "consent_records_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "profiles"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questionnaire_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.risk_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consent_records ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_delete_own" ON public.profiles;

CREATE POLICY "profiles_select_own"
ON public.profiles
FOR SELECT
TO authenticated
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "profiles_insert_own"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "profiles_update_own"
ON public.profiles
FOR UPDATE
TO authenticated
USING ((SELECT auth.uid()) = user_id)
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "profiles_delete_own"
ON public.profiles
FOR DELETE
TO authenticated
USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "questionnaire_responses_select_own" ON public.questionnaire_responses;
DROP POLICY IF EXISTS "questionnaire_responses_insert_own" ON public.questionnaire_responses;
DROP POLICY IF EXISTS "questionnaire_responses_update_own" ON public.questionnaire_responses;
DROP POLICY IF EXISTS "questionnaire_responses_delete_own" ON public.questionnaire_responses;

CREATE POLICY "questionnaire_responses_select_own"
ON public.questionnaire_responses
FOR SELECT
TO authenticated
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "questionnaire_responses_insert_own"
ON public.questionnaire_responses
FOR INSERT
TO authenticated
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "questionnaire_responses_update_own"
ON public.questionnaire_responses
FOR UPDATE
TO authenticated
USING ((SELECT auth.uid()) = user_id)
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "questionnaire_responses_delete_own"
ON public.questionnaire_responses
FOR DELETE
TO authenticated
USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "risk_assessments_select_own" ON public.risk_assessments;
DROP POLICY IF EXISTS "risk_assessments_insert_own" ON public.risk_assessments;
DROP POLICY IF EXISTS "risk_assessments_update_own" ON public.risk_assessments;
DROP POLICY IF EXISTS "risk_assessments_delete_own" ON public.risk_assessments;

CREATE POLICY "risk_assessments_select_own"
ON public.risk_assessments
FOR SELECT
TO authenticated
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "risk_assessments_insert_own"
ON public.risk_assessments
FOR INSERT
TO authenticated
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "risk_assessments_update_own"
ON public.risk_assessments
FOR UPDATE
TO authenticated
USING ((SELECT auth.uid()) = user_id)
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "risk_assessments_delete_own"
ON public.risk_assessments
FOR DELETE
TO authenticated
USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "consent_records_select_own" ON public.consent_records;
DROP POLICY IF EXISTS "consent_records_insert_own" ON public.consent_records;
DROP POLICY IF EXISTS "consent_records_update_own" ON public.consent_records;
DROP POLICY IF EXISTS "consent_records_delete_own" ON public.consent_records;

CREATE POLICY "consent_records_select_own"
ON public.consent_records
FOR SELECT
TO authenticated
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "consent_records_insert_own"
ON public.consent_records
FOR INSERT
TO authenticated
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "consent_records_update_own"
ON public.consent_records
FOR UPDATE
TO authenticated
USING ((SELECT auth.uid()) = user_id)
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "consent_records_delete_own"
ON public.consent_records
FOR DELETE
TO authenticated
USING ((SELECT auth.uid()) = user_id);
