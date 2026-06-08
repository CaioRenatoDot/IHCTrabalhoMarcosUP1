-- Front do Gabriel - RLS policies for catalog, versioning and audit tables.

ALTER TABLE public.dataset_references ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dataset_feature_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.risk_model_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auth_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_factor_details ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "dataset_references_select_authenticated" ON public.dataset_references;
CREATE POLICY "dataset_references_select_authenticated"
ON public.dataset_references
FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "dataset_feature_mappings_select_authenticated" ON public.dataset_feature_mappings;
CREATE POLICY "dataset_feature_mappings_select_authenticated"
ON public.dataset_feature_mappings
FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "risk_model_versions_select_authenticated" ON public.risk_model_versions;
CREATE POLICY "risk_model_versions_select_authenticated"
ON public.risk_model_versions
FOR SELECT
TO authenticated
USING (true);

-- Audit and factor detail tables remain backend/service-role only.
-- RLS is enabled, but no public/authenticated policies are created here.
