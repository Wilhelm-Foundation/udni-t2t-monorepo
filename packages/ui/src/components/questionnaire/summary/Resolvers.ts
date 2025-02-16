import { Sex } from "../../../interfaces/phenopackets/schema/v2/core/individual";
import { Phenopacket } from "../../../interfaces/phenopackets/schema/v2/phenopackets";
import { ICustomFormData } from "../../../types";

export const calculateAge = (
  fromDate: Date | undefined,
  dateOfBirth: Date | undefined,
  onlyYears: boolean = false
): string => {
  if (dateOfBirth) {
    const today = new Date();
    const dob = new Date(dateOfBirth);
    const from = fromDate ? new Date(fromDate) : new Date(today);

    let years = from.getFullYear() - dob.getFullYear();
    let months = from.getMonth() - dob.getMonth();

    if (months < 0 || (months === 0 && from.getDate() < dob.getDate())) {
      years--;
      months += 12;
    }

    if (from.getDate() < dob.getDate()) {
      months--;
    }

    if (years === 0) {
      return `${months} month${months !== 1 ? "s" : ""}`;
    } else if (months === 0) {
      return `${years} year${years !== 1 ? "s" : ""}`;
    } else {
      if (onlyYears) return `${years} year${years !== 1 ? "s" : ""}`;
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
  formDataKey?: string;
  phenoPacketKey?: string;
};

export const dynamicResolvers = {
  age: (context: ResolverData) =>
    calculateAge(undefined, context.phenoPacket.subject?.dateOfBirth),
  ageMother: (context: ResolverData) =>
    calculateAge(
      context.phenoPacket.subject?.dateOfBirth,
      new Date(context.formData["motherBirthdate"]),
      true
    ),
  ageFather: (context: ResolverData) =>
    calculateAge(
      context.phenoPacket.subject?.dateOfBirth,
      new Date(context.formData["fatherBirthdate"]),
      true
    ),
  sex: (context: ResolverData) => getSex(context.phenoPacket.subject?.sex),
  relativeAffected: (context: ResolverData) => {
    const selectedValue = context.formData["relativeAffected"];
    if (selectedValue === "No") return "are no";
    else if (selectedValue === "Yes") return "are";
    else if (selectedValue === "Unknown") return "are/are no";
    return "";
  },
  phenotypicFeatureStatus: (context: ResolverData) =>
    context.phenoPacket.phenotypicFeatures?.find(
      (f) => f.description === context.phenoPacketKey
    )
      ? "Abnormal"
      : "Normal",
  phenotypicFeatureComplicatedHPO: (context: ResolverData) => {
    const hpoTerm = context.phenoPacket.phenotypicFeatures?.find(
      (f) => f.description === context.phenoPacketKey && f.excluded === false
    );
    return hpoTerm?.type?.id;
  },
  customFormDataResolver: (context: ResolverData) =>
    context.formData[context.formDataKey!],
};
