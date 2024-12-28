import { BrowserRouter, Routes, Route } from "react-router-dom";
import Help from "@repo/ui/help";
import Index from "@repo/ui/index";
import NotFound from "@repo/ui/notFound";
import EditIndividual from "@repo/ui/editIndividual";
import QuestionnaireLayout from "@repo/ui/questionnaireLayout";
import Questionnaire from "@repo/ui/questionnaireIndex";
import FormSectionPage from "@repo/ui/questionnaireFormSectionPage";
import { AppProvider } from "@repo/ui/appContext";
import SummaryPage from "@repo/ui/questionnaireSummaryPage";
import tip2toeForm from "./tip2toeform";

function App() {
  return (
    <AppProvider tip2toeForm={tip2toeForm} apiUrl={import.meta.env.VITE_APIURL}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/help" element={<Help />} />
          <Route path="/questionnaire" element={<QuestionnaireLayout />}>
            <Route index element={<Questionnaire />} />
            <Route path="overview" element={<Questionnaire />} />
            <Route path="individual" element={<EditIndividual />} />
            <Route path=":slug" element={<FormSectionPage />} />
            <Route path="summary" element={<SummaryPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
