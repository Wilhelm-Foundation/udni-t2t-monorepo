import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
//!!import tip2toeForm from '../../tip2toeform';
import { IFormSection } from "../../types";
import FormSection from "./FormSection";
import { AppContext } from "../../context/AppContext";

export default function FormSectionPage() {
  const {
    state: { tip2toeForm },
  } = useContext(AppContext);
  const { slug } = useParams();

  const [section, setSection] = useState<IFormSection | undefined>(undefined);

  useEffect(() => {
    const i = Number(
      tip2toeForm?.formSections?.findIndex((x) => x.slug === slug)
    );
    if (i >= 0)
      setSection(tip2toeForm?.formSections && tip2toeForm?.formSections[i]);
  }, [slug]);

  return <>{section ? <FormSection formSection={section} /> : null}</>;
}
