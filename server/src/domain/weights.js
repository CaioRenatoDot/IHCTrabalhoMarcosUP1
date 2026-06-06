export const GROUP_WEIGHTS = {
  profile: 18,
  familyHistory: 27,
  symptomsExams: 27,
  hormonalReproductive: 15,
  lifestyle: 13,
}

export const GROUP_FACTOR_WEIGHTS = {
  profile: {
    age: 0.4,
    cancerDiagnosis: 0.6,
  },
  familyHistory: {
    familyBreastCancer: 0.55,
    brcaTest: 0.3,
    familyOvaryCancer: 0.15,
  },
  symptomsExams: {
    symptoms: 0.55,
    mammogram: 0.3,
    breastPain: 0.15,
  },
  hormonalReproductive: {
    hormonalContraceptive: 0.2,
    hormoneReplacement: 0.3,
    menarche: 0.15,
    menopause: 0.2,
    breastfed: 0.15,
  },
  lifestyle: {
    physicalActivity: 0.2,
    alcohol: 0.2,
    smoking: 0.25,
    diet: 0.15,
    bmi: 0.2,
  },
}

export const CLASSIFICATION_THRESHOLDS = {
  lowMax: 32,
  moderateMax: 65,
}

