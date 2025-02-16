import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import { AppContext } from "../../context/AppContext";
import { Phenopacket } from "../../interfaces/phenopackets/schema/v2/phenopackets";
import { Control, DynamicPlaceholder, ICustomFormData } from "../../types";
import { dynamicResolvers } from "./summary/Resolvers";

interface IProps {
  phenoPacket: Partial<Phenopacket>;
  customFormData?: ICustomFormData;
}

export default function SummaryNew({ phenoPacket, customFormData }: IProps) {
  const {
    state: { tip2toeForm, summaryForm: config },
    dispatch,
  } = useContext(AppContext);

  const handleChange = (key: string, value: string) => {
    dispatch({
      type: "CUSTOM_FORM_DATA",
      payload: { ...customFormData, [key]: value },
    });
  };

  const renderControl = (control: Control) => {
    switch (control.type) {
      case "dropdown":
        return (
          <select
            className="py-2 rounded border border-gray-300 shadow-sm focus:border-udni-teal focus:ring-4 focus:outline-none focus:ring-udni-teal-100"
            value={customFormData![control.key] || ""}
            onChange={(e) => handleChange(control.key, e.target.value)}
          >
            <option value="">Select</option>
            {control.options.map((option, index) => (
              <option key={index} value={index + 1}>
                {option}
              </option>
            ))}
          </select>
        );
      case "textbox":
        return (
          <input
            className="p-2 rounded border border-gray-300 shadow-sm focus:border-udni-teal focus:ring-4 focus:outline-none focus:ring-udni-teal-100"
            type="text"
            value={customFormData![control.key] || ""}
            onChange={(e) => handleChange(control.key, e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  function isKeyOfResolvers(key: string): key is keyof typeof dynamicResolvers {
    return key in dynamicResolvers;
  }

  const resolveDynamicPlaceholder = (placeholder: DynamicPlaceholder) => {
    if (isKeyOfResolvers(placeholder.key)) {
      const resolver = dynamicResolvers[placeholder.key];
      if (resolver) {
        console.log("formData", customFormData);
        console.log("phenoPacket", phenoPacket);
        return resolver({
          phenoPacket,
          formData: customFormData || {},
          formDataKey: placeholder.formDataKey,
          phenoPacketKey: placeholder.phenotypicFeatureKey,
        });
      }
    }
    return `[Unknown: ${placeholder.key}]`;
  };

  const renderContent = (content: (string | Control)[]) => {
    return content.map((item, index) => {
      if (typeof item === "string") {
        return <span key={index}>{item}</span>;
      } else if (typeof item === "object" && item.type === "dynamic") {
        return (
          <span key={index}>
            <NavLink
              className={({ isActive }) =>
                ` items-center rounded-md text-udni-teal`
              }
              to={`/questionnaire/${item.source}`}
            >
              {resolveDynamicPlaceholder(item) || "No Data"}
            </NavLink>
          </span>
        );
      } else {
        return <span key={index}>{renderControl(item)}</span>;
      }
    });
  };

  return (
    <div>
      {config?.sections.map((section, index) => (
        <div key={index}>
          <h4>{section.text}</h4>
          <p>{renderContent(section.content)}</p>
          <br />
          <br />
          {/* TODO: instead of br use padding or mrgin for bottom spacing */}
        </div>
      ))}
    </div>
  );
}
