import {
  InformationCircleIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { OntologyClass } from "../../../interfaces/phenopackets/schema/v2/core/base";
import { YesNoUnknown } from "../../../types";
import SelectNormal from "./SelectNormal";
import { Disclosure } from "@headlessui/react";
import { useContext, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../../context/AppContext";

interface IProps {
  ontology: OntologyClass;
  value?: YesNoUnknown;
  onChange: (value: YesNoUnknown) => void;
}

type TermTranslation = {
  main: string;
  synonyms: { text: string; weight: number }[];
  clinical: string;
};

export default function EditPhenotypicFeature({
  ontology,
  value,
  onChange,
}: IProps) {
  const { id, label } = ontology;
  const ref = useRef<HTMLButtonElement>(null);
  const [disclosureStatus, setDisclosureStatus] = useState<boolean>(false);
  const {
    state: { translationSupport },
  } = useContext(AppContext);
  const { t } = useTranslation();
  const safeKey = id.replace(":", "_");
  const termData = t(`terms.${safeKey}`, {
    returnObjects: true,
  }) as TermTranslation;
  const { main = label, synonyms, clinical } = termData;
  const [copied, setCopied] = useState(false);

  // export default function TermDisplay({ termCode }) {
  //   const { t } = useTranslation();

  //   // Get translation object for the given HPO term
  //   const termData = t(`terms.${termCode}`, { returnObjects: true });

  //   if (!termData) return null;

  //   const { main, synonyms, clinical } = termData;

  //   return (
  //     <div className="p-4 border rounded-xl shadow-sm max-w-md">
  //       <h3 className="text-lg font-semibold">{main}</h3>

  //       <button
  //         onClick={() => alert(synonyms.map(s => s.text).join(", "))}
  //         className="ml-2 text-sm text-blue-600 underline"
  //       >
  //         Show synonyms
  //       </button>

  //       <div className="mt-2 text-sm text-gray-600">
  //         <strong>Clinical term:</strong> {clinical}
  //       </div>
  //     </div>
  //   );
  // }

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2 seconds
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              ref={ref}
              onClick={() => {
                setDisclosureStatus(!open);
                if (!open) {
                }
              }}
              // className="flex w-full justify-between rounded-lg px-2 py-2 text-left text-sm font-medium text-udni-teal focus:outline-none"
              className="flex w-full text-left "
            >
              <div>
                <div className="flex flex-row items-center">
                  <h3 className="m-0">{main}</h3>
                  {translationSupport && (
                    <InformationCircleIcon className="w-5 h-5 inline-block ml-1" />
                  )}
                </div>
                <p className="text-sm text-gray-500">{id}</p>
              </div>
            </Disclosure.Button>
            {translationSupport && (
              <Disclosure.Panel className="py-2 text-sm text-slate-500">
                {synonyms && (
                  <>
                    <h3>
                      Synonyms{" "}
                      {copied ? (
                        <>
                          <ClipboardDocumentCheckIcon className="w-5 h-5 inline-block ml-1"></ClipboardDocumentCheckIcon>
                          <span className="bg-white-800 text-xs px-2 py-1 rounded-md shadow-md">
                            Copied!
                          </span>
                        </>
                      ) : (
                        <ClipboardDocumentIcon
                          className="w-5 h-5 inline-block ml-1 cursor-pointer"
                          onClick={async () => await handleCopy(clinical)}
                        ></ClipboardDocumentIcon>
                      )}
                      :
                    </h3>
                    {synonyms.map((synonym, index) => (
                      <p key={index}>{synonym.text}</p>
                    ))}
                  </>
                )}
              </Disclosure.Panel>
            )}
          </>
        )}
      </Disclosure>
      <div className="mt-4">
        <SelectNormal
          value={value}
          onChange={(v) => {
            onChange(v);
          }}
        />
      </div>
    </div>
  );

  //   return (
  //     <div>
  //       <Disclosure>
  //         {({ open }) => (
  //           <>
  //             <Disclosure.Button
  //               ref={ref}
  //               onClick={() => {
  //                 setDisclosureStatus(!open);
  //                 if (!open) {
  //                 }
  //               }}
  //               // className="flex w-full justify-between rounded-lg px-2 py-2 text-left text-sm font-medium text-udni-teal focus:outline-none"
  //               className="flex w-full text-left "
  //             >
  //               <div>
  //                 <div className="flex flex-row items-center">
  //                   <h3 className="m-0">{label}</h3>
  //                   <InformationCircleIcon className="w-5 h-5 inline-block ml-1" />
  //                 </div>
  //                 <p className="text-sm text-gray-500">{id}</p>
  //               </div>
  //             </Disclosure.Button>
  //             <Disclosure.Panel className="py-2 text-sm text-slate-500">
  //               <h3>
  //                 Synonyms{" "}
  //                 <ClipboardDocumentIcon className="w-4 h-4 inline-block ml-1"></ClipboardDocumentIcon>
  //                 :
  //               </h3>
  //               <p>Abnormal delivery</p>
  //               <p>Delivery complication</p>
  //             </Disclosure.Panel>
  //           </>
  //         )}
  //       </Disclosure>
  //       <div className="mt-4">
  //         <SelectNormal
  //           value={value}
  //           onChange={(v) => {
  //             onChange(v);
  //           }}
  //         />
  //       </div>
  //     </div>
  //   );
}
