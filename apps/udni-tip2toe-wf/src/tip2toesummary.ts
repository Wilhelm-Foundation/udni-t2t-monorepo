import { Config, IPreselectArguments } from "@repo/ui/types";

const SD_VALUES = [
  "≤ -3",
  "-2 to -3",
  "-1 to -2",
  "-1 to +1",
  "+1 to +2",
  "+2 to +3",
  "≥ +3",
];
const APGAR_SCORE_VALUES = [...Array(10).keys()].map((num) => `${num + 1}`);
const YEAR_VALUES = [...Array(20).keys()].map((num) => `${num + 1}`);
const MONTH_VALUES = [...Array(12).keys()].map((num) => `${num + 1}`);
const HEIGHT_CM_VALUES = [...Array(100).keys()].map((num) => `${num + 100}`);

export const config: Config = {
  sections: [
    {
      text: "Family history",
      content: [
        "The patient, a ",
        {
          type: "dynamic",
          key: "age", // Resolved using the "age" resolver
          source: "individual", // Must be matched with form slug
        },
        " old ",
        {
          type: "dynamic",
          key: "sex", // Resolved using the "sex" resolver
          source: "individual",
        },
        " is the ",
        {
          type: "dropdown",
          options: ["first", "second", "third", "fourth", "fifth"],
          key: "childOrder",
        },
        " child born to ",
        {
          type: "dropdown",
          options: ["non-consanguinous", "consanguinous"],
          key: "parentConsanguinity",
        },
        " parents of ",
        {
          type: "dynamic",
          formDataKey: "ethnicity",
          key: "customFormDataResolver",
          source: "individual",
        },
        " origin. ",
        {
          type: "dropdown",
          options: [
            "The patient’s parents are  healthy",
            "The patient’s mother is affected",
            "The patient’s father is affected",
          ],
          key: "parentHealth",
        },
        " There ",
        {
          type: "dynamic",
          key: "relativeAffected",
          source: "family-history",
        },
        " other known family members affected. At delivery, the mother was ",
        {
          type: "dynamic",
          key: "ageMother",
          source: "individual",
        },
        " old and the father ",
        {
          type: "dynamic",
          key: "ageFather",
          source: "individual",
        },
        " old.  ",
      ],
    },
    {
      text: "Pregnancy and birth",
      content: [
        "The pregnancy was ",
        {
          type: "dynamic",
          key: "phenotypicFeatureStatus",
          phenotypicFeatureKey: "pregnancy",
          source: "pregnancy",
        },
        ", ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "pregnancy",
          source: "pregnancy",
        },
        " and ",
        {
          type: "textbox",
          key: "pregnancy",
        },
        ". Prenatal ultrasound was ",
        {
          type: "dropdown",
          options: ["not performed", "normal", "abnormal"],
          key: "ultrasoundStatus",
        },
        " ",
        {
          type: "textbox",
          key: "prenatalUltrasoundResult",
        },
        ". Prenatal screening was ",
        {
          type: "dropdown",
          options: ["not performed", "normal", "abnormal"],
          key: "prenatalScreeningStatus",
        },
        {
          type: "textbox",
          key: "prenatalScreeningResult",
        },
        ". The patient was born by ",
        {
          type: "dropdown",
          options: ["vaginal delivery", "cesarean section"],
          key: "deliveryType",
        },
        " at gestational age ",
        {
          type: "dynamic",
          formDataKey: "gestionalAge",
          key: "customFormDataResolver",
          source: "growth-chart",
        },
        " weeks. The delivery was ",
        {
          type: "dynamic",
          key: "phenotypicFeatureStatus",
          phenotypicFeatureKey: "delivery",
          source: "delivery",
        },
        ", ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "delivery",
          source: "delivery",
        },
        " and ",
        {
          type: "textbox",
          key: "delivery",
        },
        ". Birth weight was ",
        {
          type: "dynamic",
          formDataKey: "birthWeight",
          key: "customFormDataResolver",
          source: "growth-chart",
        },
        " grams - [ ",
        {
          type: "dropdown",
          options: [...SD_VALUES],
          key: "lastVisitWeightSd",
          preselected: ({ formData }: IPreselectArguments): string => {
            const birthWeightData = formData["birthWeight"];
            if (birthWeightData) {
              const birthWeight = +birthWeightData || 0;
              const ranges = [
                { min: 0, max: 2000, result: "1" },
                { min: 2001, max: 2500, result: "2" },
                { min: 2501, max: 2900, result: "3" },
                { min: 2901, max: 4000, result: "4" },
                { min: 4001, max: 4500, result: "5" },
                { min: 4501, max: 5000, result: "6" },
                { min: 5001, max: Number.POSITIVE_INFINITY, result: "7" },
              ];

              const matchedRange = ranges.find(
                (range) => birthWeight >= range.min && birthWeight <= range.max
              );

              return matchedRange?.result || "";
            }
            return "";
          },
        },
        " SD], birth length ",
        {
          type: "dynamic",
          formDataKey: "birthLength",
          key: "customFormDataResolver",
          source: "growth-chart",
        },
        " centimeters  - [ ",
        {
          type: "dropdown",
          options: [...SD_VALUES],
          key: "lastVisitLengthSd",
          preselected: ({ formData }: IPreselectArguments): string => {
            const birthLengthData = formData["birthLength"];
            if (birthLengthData) {
              const birthLength = +birthLengthData || 0;

              const ranges = [
                { min: 0, max: 44, result: "1" },
                { min: 44.1, max: 46, result: "2" },
                { min: 46.1, max: 48, result: "3" },
                { min: 48.1, max: 52, result: "4" },
                { min: 52.1, max: 54, result: "5" },
                { min: 54.1, max: 56, result: "6" },
                { min: 56, max: Number.POSITIVE_INFINITY, result: "7" },
              ];

              const matchedRange = ranges.find(
                (range) => birthLength >= range.min && birthLength <= range.max
              );

              return matchedRange?.result || "";
            }
            return "";
          },
        },
        " SD], and head circumference ",
        {
          type: "dynamic",
          formDataKey: "headCircumference",
          key: "customFormDataResolver",
          source: "growth-chart",
        },
        " centimeters - [ ",
        {
          type: "dropdown",
          options: [...SD_VALUES],
          key: "lastVisitHeadCircumferenceSd",
          preselected: ({ formData }: IPreselectArguments): string => {
            const headCircumferenceData = formData["headCircumference"];
            if (headCircumferenceData) {
              const headCircumference = +headCircumferenceData || 0;
              const ranges = [
                { min: 0, max: 30, result: "1" },
                { min: 30.1, max: 31.5, result: "2" },
                { min: 31.6, max: 32.9, result: "3" },
                { min: 33, max: 37, result: "4" },
                { min: 37.1, max: 38.5, result: "5" },
                { min: 38.6, max: 40, result: "6" },
                { min: 40.1, max: Number.POSITIVE_INFINITY, result: "7" },
              ];

              const matchedRange = ranges.find(
                (range) =>
                  headCircumference >= range.min &&
                  headCircumference <= range.max
              );

              return matchedRange?.result || "";
            }
            return "";
          },
        },
        " SD]. Apgar scores were (",
        {
          type: "dropdown",
          options: [...APGAR_SCORE_VALUES],
          key: "apgarScore1",
        },
        "),  ( ",
        {
          type: "dropdown",
          options: [...APGAR_SCORE_VALUES],
          key: "apgarScore5",
        },
        " ), and  ( ",
        {
          type: "dropdown",
          options: [...APGAR_SCORE_VALUES],
          key: "apgarScore10",
        },
        " ) after 1, 5 and 10 minutes, respectively. ",
      ],
    },
    {
      text: "Neonatal",
      content: [
        "The patient’s neonatal period was ",
        {
          type: "dynamic",
          key: "phenotypicFeatureStatus",
          phenotypicFeatureKey: "neonatal-period-complications",
          source: "neonatal-period-complications",
        },
        ", ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "neonatal-period-complications",
          source: "neonatal-period-complications",
        },
        " and ",
        {
          type: "textbox",
          key: "neonatalPeriodComplications",
        },
        ". Newborn screening was performed with ",
        {
          type: "dropdown",
          options: ["normal", "abnormal"],
          key: "newbornScreening",
        },
        " results - ",
        {
          type: "textbox",
          key: "newbornScreeningResult",
        },
        ". Imaging (e.g. ultrasound) during the neonatal period showed ",
        {
          type: "dropdown",
          options: ["normal", "abnormal"],
          key: "neonatalPeriodImaging",
        },
        " results. ",
        {
          type: "textbox",
          key: "neonatalPeriodImagingFinding",
        },
      ],
    },
    {
      text: "Childhood into adulthood",
      content: [
        "The developmental milestones during the first years were ",
        {
          type: "dropdown",
          options: ["normal", "delayed"],
          key: "developmentalMilestones",
          preselected: ({ phenoPacket }: IPreselectArguments): string => {
            const hpoTerm = phenoPacket.phenotypicFeatures?.find(
              (f) =>
                f.description === "cognition" &&
                f.excluded === false &&
                f.type?.id === "HP:0001263"
            );
            if (hpoTerm) {
              return "2";
            }
            return "0";
          },
        },
        "The patient could sit unsupported at ",
        {
          type: "dropdown",
          options: [...MONTH_VALUES],
          key: "sitUnsupportedMonths",
        },
        " months and walk independently at ",
        {
          type: "dropdown",
          options: [...MONTH_VALUES],
          key: "walkIndependentlyMonths",
        },
        " months of age. At the last visit, at age ",
        {
          type: "dropdown",
          options: [...YEAR_VALUES],
          key: "lastVisitAgeYear",
        },
        " years and ",
        {
          type: "dropdown",
          options: [...MONTH_VALUES],
          key: "lastVisitAgeMonth",
        },
        " months, the patient was ",
        {
          type: "dropdown",
          options: ["ambulatory", "non ambulatory"],
          key: "lastVisitPatientAmbulatoryStatus",
        },
        ".",
        {
          type: "lineBreak",
        },
        "The speech development was ",
        {
          type: "dynamic",
          key: "phenotypicFeatureStatus",
          phenotypicFeatureKey: "speech",
          source: "speech",
        },
        ". Today, at age ",
        {
          type: "dropdown",
          options: [...YEAR_VALUES],
          key: "speechAgeYear",
        },
        " years and ",
        {
          type: "dropdown",
          options: [...MONTH_VALUES],
          key: "speechAgeMonth",
        },
        " months, the patient has ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "speech",
          source: "speech",
        },
        ", ",
        {
          type: "textbox",
          key: "speech",
        },
        ".",
        {
          type: "lineBreak",
        },
        "Neurological examination at the age of ",
        {
          type: "dropdown",
          options: [...YEAR_VALUES],
          key: "neurologicalExaminationAgeYear",
        },
        " years and ",
        {
          type: "dropdown",
          options: [...MONTH_VALUES],
          key: "neurologicalExaminationAgeMonth",
        },
        " months was ",
        {
          type: "dropdown",
          options: ["normal", "abnormal"],
          key: "neurologicalExamination",
        },
        ". The patient showed a ",
        {
          type: "dynamic",
          key: "phenotypicFeatureStatus",
          phenotypicFeatureKey: "central-nervous-system",
          source: "central-nervous-system",
        },
        " psychomotor development with ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "central-nervous-system",
          source: "central-nervous-system",
        },
        ", and ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "muscles",
          source: "muscles",
        },
        ", ",
        {
          type: "textbox",
          key: "psychomotorDevelopment",
        },
        ". A formal cognitive evaluation performed at age ",
        {
          type: "dropdown",
          options: [...YEAR_VALUES],
          key: "formalCognitiveEvaluationAgeYear",
        },
        " years and ",
        {
          type: "dropdown",
          options: [...MONTH_VALUES],
          key: "formalCognitiveEvaluationAgeMonth",
        },
        " months revealed ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "cognition",
          source: "cognition",
        },
        ". There ",
        {
          type: "dropdown",
          options: ["are", "are no"],
          key: "developmentalSignsRegression",
        },
        " signs of developmental regression. ",
        {
          type: "lineBreak",
        },
        "The patient’s behaviour is ",
        {
          type: "dynamic",
          key: "phenotypicFeatureStatus",
          phenotypicFeatureKey: "behavioral-abnormality",
          source: "behavioral-abnormality",
        },
        " with ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "behavioral-abnormality",
          source: "behavioral-abnormality",
        },
        ", ",
        {
          type: "textbox",
          key: "behavioralAbnormality",
        },
        ". At the age of ",
        {
          type: "dropdown",
          options: [...YEAR_VALUES],
          key: "formallyDiagnosedAgeYear",
        },
        " years and ",
        {
          type: "dropdown",
          options: [...MONTH_VALUES],
          key: "formallyDiagnosedAgeMonth",
        },
        " months the patient was formally diagnosed with ",
        {
          type: "textbox",
          key: "formallyDiagnosis",
        },
        ".",
        {
          type: "lineBreak",
        },
        "The patient ",
        {
          type: "dropdown",
          options: ["has not", "has"],
          key: "seizuresDeveloped",
          preselected: ({ phenoPacket }: IPreselectArguments): string => {
            const hpoTerm = phenoPacket.phenotypicFeatures?.find(
              (f) =>
                f.description === "seizures" &&
                f.excluded === false &&
                f.type?.id === "HP:0001250"
            );
            if (hpoTerm) {
              return "2";
            }
            return "0";
          },
        },
        " developed seizures. The seizures age of onset was ",
        {
          type: "dropdown",
          options: [...YEAR_VALUES],
          key: "seizuresOnsetAgeYear",
        },
        " years and ",
        {
          type: "dropdown",
          options: [...MONTH_VALUES],
          key: "seizuresOnsetAgeMonth",
        },
        " months. The seizures are characterized by ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "seizures",
          source: "seizures",
        },
        " ",
        {
          type: "textbox",
          key: "seizuresSemiology",
        },
        ". Electroencephalogram (EEG) examination has been ",
        {
          type: "dropdown",
          options: ["normal", "abnormal", "not performed"],
          key: "eegExamination",
          preselected: ({ phenoPacket }: IPreselectArguments): string => {
            const hpoTerm = phenoPacket.phenotypicFeatures?.find(
              (f) =>
                f.description === "seizures" &&
                f.excluded === false &&
                f.type?.id === "HP:0002353"
            );
            if (hpoTerm) {
              return "2";
            }
            return "0";
          },
        },
        " with findings of ",
        {
          type: "textbox",
          key: "eegExaminationFinding",
        },
        ". ",
        {
          type: "lineBreak",
        },
        "Ophthalmologic examination has been ",
        {
          type: "dropdown",
          options: ["normal", "abnormal"],
          key: "ophthalmologiEexamination",
        },
        "  with findings of ",
        {
          type: "textbox",
          key: "ophthalmologiEexaminationFinding",
        },
        ". Auditory examination has been ",
        {
          type: "dropdown",
          options: ["normal", "abnormal"],
          key: "auditoryEexamination",
        },
        " with findings of ",
        {
          type: "textbox",
          key: "auditoryEexaminationFinding",
        },
        ". ",
        {
          type: "lineBreak",
        },
        "Additional health issues identified during ",
        {
          type: "dropdown",
          options: ["childhood", "adolescence", "adulthood"],
          key: "additionalHealthIssueStage",
        },
        " include ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "connective-tissue",
          source: "connective-tissue",
        },
        ", ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "immune-systemblood",
          source: "immune-systemblood",
        },
        ", ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "gastrointestinal",
          source: "gastrointestinal",
        },
        ", ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "cancermalignancy-benign-tumor",
          source: "cancermalignancy-benign-tumor",
        },
        ", ",
        {
          type: "textbox",
          key: "additionalHealthMentalIssue",
        },
      ],
    },
    {
      text: "Growth",
      content: [
        "At birth, the patient presented with ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "growth-at-birth",
          source: "growth-at-birth",
        },
        ". The longitudinal growth went from [ ",
        {
          type: "dropdown",
          options: [...SD_VALUES],
          key: "longitudinalGrowthFrom",
        },
        " SD] at birth to [ ",
        {
          type: "dropdown",
          options: [...SD_VALUES],
          key: "longitudinalGrowthTo",
        },
        " SD] at ",
        {
          type: "dropdown",
          options: [...YEAR_VALUES],
          key: "longitudinalGrowthAgeYear",
        },
        " years and ",
        {
          type: "dropdown",
          options: [...MONTH_VALUES],
          key: "longitudinalGrowthAgeMonth",
        },
        " months of age. The parental heights are ",
        {
          type: "dropdown",
          options: [...HEIGHT_CM_VALUES],
          key: "motherHeightCm",
        },
        " cm (mother) and ",
        {
          type: "dropdown",
          options: [...HEIGHT_CM_VALUES],
          key: "fatherHeightCm",
        },
        " cm (father), corresponding to a target height of ",
        {
          type: "dropdown",
          options: [...HEIGHT_CM_VALUES],
          key: "targetHeightCm",
        },
        " cm [ ",
        {
          type: "dropdown",
          options: [...SD_VALUES],
          key: "targetHeightSd",
        },
        " SD].",
        {
          type: "lineBreak",
        },
        "At the last visit at age ",
        {
          type: "dynamic",
          key: "lastVisitAge",
          source: "growth-chart",
        },
        ", the patient´s weight was ",
        {
          type: "dynamic",
          formDataKey: "lastVisitWeight",
          key: "customFormDataResolver",
          source: "growth-chart",
        },
        " kg, height ",
        {
          type: "dynamic",
          formDataKey: "lastVisitLength",
          key: "customFormDataResolver",
          source: "growth-chart",
        },
        " cm and head circumference ",
        {
          type: "dynamic",
          formDataKey: "lastVisitHeadCircumference",
          key: "customFormDataResolver",
          source: "growth-chart",
        },
        " cm. The patient ",
        {
          type: "dropdown",
          options: ["has", "no"],
          key: "postnatalGrowthAbnormalities",
        },
        " postnatal growth abnormalities ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "post-natal-growth",
          source: "post-natal-growth",
        },
        ". ",
      ],
    },
    {
      text: "Examination",
      content: [
        "The patient ",
        {
          type: "dropdown",
          options: ["has", "has no"],
          key: "hasAnyDysmorphicFeatures",
        },
        " dysmorphic features. ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "facial-morphology",
          source: "facial-morphology",
        },
        ", ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "eyes",
          source: "eyes",
        },
        ", ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "mouthteeth",
          source: "mouthteeth",
        },
        ", ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "nose",
          source: "nose",
        },
        ", ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "ears",
          source: "ears",
        },
        ", ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "trunk",
          source: "trunk",
        },
        ", ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "upper-limbs",
          source: "upper-limbs",
        },
        ", ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "hands-fingers-and-thumbs",
          source: "hands-fingers-and-thumbs",
        },
        ", ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "lower-limbs",
          source: "lower-limbs",
        },
        ", ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "feettoes",
          source: "feettoes",
        },
        ", ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "genitalia",
          source: "genitalia",
        },
        ", ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "skin",
          source: "skin",
        },
        ", ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "hairnails",
          source: "hairnails",
        },
        " ",
        {
          type: "textbox",
          key: "additionalFindings",
        },
        ".",
        {
          type: "lineBreak",
        },
        "The patient has ",
        {
          type: "dropdown",
          options: [
            "not undergone surgeries",
            "undergone the following surgeries",
          ],
          key: "hasUndergonSurgeries",
        },
        " ",
        {
          type: "textbox",
          key: "additionalFindingsSurgeries",
        },
        ".",
      ],
    },
    {
      text: "Imaging",
      content: [
        "MRI examination of the brain has been ",
        {
          type: "dropdown",
          options: ["not performed", "performed"],
          key: "mriStatus",
        },
        " at age(s) ",
        {
          type: "dropdown",
          options: [...YEAR_VALUES],
          key: "mriPerformedAge",
        },
        " with ",
        {
          type: "dropdown",
          options: ["normal", "abnormal"],
          key: "mriResult",
          preselected: ({ phenoPacket }: IPreselectArguments): string => {
            const hpoTerm = phenoPacket.phenotypicFeatures?.find(
              (f) =>
                f.description === "central-nervous-system" &&
                f.excluded === false &&
                f.type?.id === "HP:0012443"
            );
            if (hpoTerm) {
              return "2";
            }
            return "0";
          },
        },
        " results: ",
        {
          type: "textbox",
          key: "abnormalBrainMorphology",
        },
        ". Ultrasound examination of the heart has been ",
        {
          type: "dropdown",
          options: ["normal", "abnormal", "not performed", "performed"],
          key: "heartUltrasoundExamination",
        },
        ". Ultrasound examination of the kidneys has been ",
        {
          type: "dropdown",
          options: ["normal", "abnormal", "not performed", "performed"],
          key: "kidneysUltrasoundExamination",
        },
        ". Other imaging investigations have shown ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "airways",
          source: "airways",
        },
        ", ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "heartgreat-vessels",
          source: "heartgreat-vessels",
        },
        ", ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "kidneys-and-urinary-tract",
          source: "kidneys-and-urinary-tract",
        },
        ", ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "liver-and-spleen",
          source: "liver-and-spleen",
        },
        " and ",
        {
          type: "textbox",
          key: "additionalFindingsImaging",
        },
        ".",
      ],
    },
    {
      text: "Other investigations",
      content: [
        "Endocrine and metabolic screening ",
        {
          type: "dropdown",
          options: ["have", "have not been"],
          key: "endocrineMetabolicScreeningStatus",
        },
        " performed including ",
        {
          type: "textbox",
          key: "endocrineMetabolicScreeningAdditional",
        },
        " revealing ",
        {
          type: "dynamic",
          key: "phenotypicFeatureComplicatedHPO",
          phenotypicFeatureKey: "endocrinemetabolic",
          source: "endocrinemetabolic",
        },
        " ",
        {
          type: "textbox",
          key: "endocrineMetabolicScreeningFindings",
        },
        ". Other screening tests e.g blood/csf/urine/biopsies have shown ",
        {
          type: "textbox",
          key: "otherScreeningFindings",
        },
        ".",
      ],
    },
    {
      text: "Genetic investigations",
      content: [
        "Genetic/ genomic testing has ",
        {
          type: "dropdown",
          options: ["not been performed", "been performed"],
          key: "geneticGenomicTestingStatus",
        },
        " showing the following results: ",
        {
          type: "dynamic",
          key: "previousGeneticInvestigations",
          source: "previous-genetic-investigations",
        },
        " ",
        {
          type: "textbox",
          key: "previousGeneticInvestigationsFindings",
        },
        ". ",
      ],
    },
    {
      text: "Overall clinical picture",
      content: [
        "Currently, the patient receives ",
        {
          type: "dropdown",
          options: ["no medication", "the following medication(s) and therapy"],
          key: "receiveMedication",
        },
        " ",
        {
          type: "textbox",
          key: "prescription",
        },
        ".",
      ],
    },
    {
      text: "",
      content: [
        "In summary, the patient has a ",
        {
          type: "dropdown",
          options: ["stable", "progressive"],
          key: "patientProgress",
        },
        " condition that remains undiagnosed.",
        {
          type: "lineBreak",
        },
        "The patient has seen the following specialists: ",
        {
          type: "textbox",
          key: "patientSpecialists",
        },
        ".",
        {
          type: "lineBreak",
        },
        "Differential diagnoses that have been considered in the patient are ",
        {
          type: "textbox",
          key: "patientDifferentialDiagnoses",
        },
        ".",
      ],
    },
  ],
};
