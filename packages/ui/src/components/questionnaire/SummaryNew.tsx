import { useContext, useState } from "react";

import { AppContext } from "../../context/AppContext";
import { Phenopacket } from "../../interfaces/phenopackets/schema/v2/phenopackets";
import { Control, DynamicPlaceholder, ICustomFormData } from "../../types";
import { dynamicResolvers } from "./summary/Resolvers";

interface IProps {
  phenoPacket: Partial<Phenopacket>;
  customFormData?: ICustomFormData;
}

interface FormData {
  [key: string]: string;
}

export default function SummaryNew({ phenoPacket, customFormData }: IProps) {
  const {
    state: { tip2toeForm, summaryForm: config },
  } = useContext(AppContext);

  const [formData, setFormData] = useState<FormData>({});

  const handleChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const renderControl = (control: Control) => {
    switch (control.type) {
      case "dropdown":
        return (
          <select
            className="w-24 p-2 rounded border border-gray-300 shadow-sm focus:border-udni-teal focus:ring-4 focus:outline-none focus:ring-udni-teal-100"
            value={formData[control.key] || ""}
            onChange={(e) => handleChange(control.key, e.target.value)}
          >
            <option value="">Select</option>
            {control.options.map((option, index) => (
              <option key={index} value={option}>
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
            value={formData[control.key] || ""}
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
        console.log("ethnicity", formData["ethnicity"]);
        return resolver({ phenoPacket, formData: customFormData || {} });
      }
    }
    return `[Unknown: ${placeholder.key}]`;
  };

  const renderContent = (content: (string | Control)[]) => {
    return content.map((item, index) => {
      if (typeof item === "string") {
        return <span key={index}>{item}</span>;
      } else if (typeof item === "object" && item.type === "dynamic") {
        return <span key={index}>{resolveDynamicPlaceholder(item)}</span>;
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
