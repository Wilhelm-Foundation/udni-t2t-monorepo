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
        },
        " old ",
        {
          type: "dynamic",
          key: "sex", // Resolved using the "sex" resolver
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
        },
        " other known family members affected. At delivery, the mother was  (# 20) years old and the father  (# 25) years old. ",
      ],
    },
    {
      text: "Pregnancy and birth",
      content: [
        "The pregnancy was (Normal/Abnormal), (Complicated by Pregnancy HPO-) and ",
        {
          type: "textbox",
          key: "pregnancy",
        },
      ],
    },
  ],
};
