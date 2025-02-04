import { Sex } from "../../../interfaces/phenopackets/schema/v2/core/individual";
import { Phenopacket } from "../../../interfaces/phenopackets/schema/v2/phenopackets";
import { ICustomFormData } from "../../../types";

export const calculateAge = (dateOfBirth: Date | undefined): string => {
  if (dateOfBirth) {
    const today = new Date();
    const dob = new Date(dateOfBirth);
    const now = new Date(today);

    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();

    if (months < 0 || (months === 0 && now.getDate() < dob.getDate())) {
      years--;
      months += 12;
    }

    if (now.getDate() < dob.getDate()) {
      months--;
    }

    if (years === 0) {
      return `${months} month${months !== 1 ? "s" : ""}`;
    } else if (months === 0) {
      return `${years} year${years !== 1 ? "s" : ""}`;
    } else {
      return `${years} year${years !== 1 ? "s" : ""} and ${months} month${
        months !== 1 ? "s" : ""
      }`;
    }
  }
  return ``;
};

export function getSex(sex?: Sex) {
  if (!sex) return "";
  switch (parseInt(sex?.toString())) {
    case Sex.UNKNOWN_SEX:
      return "Unknown";
    case Sex.MALE:
      return "Male";
    case Sex.FEMALE:
      return "Female";
    case Sex.UNRECOGNIZED:
      return "Unrecognized";
    case Sex.OTHER_SEX:
      return "Other";
    default:
      return "";
  }
}

type ResolverData = {
  phenoPacket: Partial<Phenopacket>;
  formData: ICustomFormData;
};

export const dynamicResolvers = {
  age: (context: ResolverData) =>
    calculateAge(context.phenoPacket.subject?.dateOfBirth),
  sex: (context: ResolverData) => getSex(context.phenoPacket.subject?.sex),
  ethnicity: (context: ResolverData) => context.formData["ethnicity"],
  relativeAffected: (context: ResolverData) => {
    const selectedValue = context.formData["relativeAffected"];
    if (selectedValue === "No") return "are no";
    else if (selectedValue === "Yes") return "are";
    else if (selectedValue === "Unknown") return "are/are no";
    return "";
  },
};
