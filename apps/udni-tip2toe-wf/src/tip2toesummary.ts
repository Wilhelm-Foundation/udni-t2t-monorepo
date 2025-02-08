import { Config } from "@repo/ui/types";

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
          key: "ethnicity",
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
          key: "pregnancyStatus",
          source: "pregnancy",
        },
        ", ",
        {
          type: "dynamic",
          key: "pregnancyComplicatedHPO",
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
        " weeks. Birth weight was ",
        {
          type: "dynamic",
          formDataKey: "birthWeight",
          key: "customFormDataResolver",
          source: "growth-chart",
        },
        " grams - [(",
        {
          type: "dynamic",
          formDataKey: "lastVisitWeight",
          key: "customFormDataResolver",
          source: "growth-chart",
        },
        ") SD], birth length ",
        {
          type: "dynamic",
          formDataKey: "birthLength",
          key: "customFormDataResolver",
          source: "growth-chart",
        },
        " centimeters  - [(",
        {
          type: "dynamic",
          formDataKey: "lastVisitLength",
          key: "customFormDataResolver",
          source: "growth-chart",
        },
        ") SD], and head circumference ",
        {
          type: "dynamic",
          formDataKey: "headCircumference",
          key: "customFormDataResolver",
          source: "growth-chart",
        },
        " centimeters - [(",
        {
          type: "dynamic",
          formDataKey: "lastVisitHeadCircumference",
          key: "customFormDataResolver",
          source: "growth-chart",
        },
        ") SD]. Apgar scores were (#),  (#), and  (#) after 1, 5 and 10 minutes, respectively. ",
      ],
    },
  ],
};
