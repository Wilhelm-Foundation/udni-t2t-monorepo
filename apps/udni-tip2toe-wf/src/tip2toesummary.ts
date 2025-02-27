import { Config } from "@repo/ui/types";

const SD_VALUES = [
  "≤ -3",
  "-2 to -3",
  "-1 to -2",
  "-1 to +1",
  "+1 to +2",
  "+2 to +3",
  "≥ +3",
];
const APGAR_SCORE_VALUES = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

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
        " grams - [( ",
        {
          type: "dropdown",
          options: [...SD_VALUES],
          key: "lastVisitWeight",
        },
        " ) SD], birth length ",
        {
          type: "dynamic",
          formDataKey: "birthLength",
          key: "customFormDataResolver",
          source: "growth-chart",
        },
        " centimeters  - [( ",
        {
          type: "dropdown",
          options: [...SD_VALUES],
          key: "lastVisitLength",
        },
        " ) SD], and head circumference ",
        {
          type: "dynamic",
          formDataKey: "headCircumference",
          key: "customFormDataResolver",
          source: "growth-chart",
        },
        " centimeters - [( ",
        {
          type: "dropdown",
          options: [...SD_VALUES],
          key: "lastVisitHeadCircumference",
        },
        " ) SD]. Apgar scores were (",
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
          key: "neonatal-period-complications",
        },
        ". Newborn screening was performed with ",
        {
          type: "dropdown",
          options: ["normal", "abnormal"],
          key: "newbornscreening",
        },
        " results - ",
        {
          type: "textbox",
          key: "newbornscreeningresult",
        },
        ". Imaging (e.g. ultrasound) during the neonatal period showed ",
        {
          type: "dropdown",
          options: ["normal", "abnormal"],
          key: "neonatalperiodimaging",
        },
        " results.",
        {
          type: "textbox",
          key: "neonatalperiodimagingfinding",
        },
      ],
    },
  ],
};
