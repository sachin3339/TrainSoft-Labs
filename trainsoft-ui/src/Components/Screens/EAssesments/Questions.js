import { Router } from "../../Common/Router";

import CreateQuestion from "./Questions/CreateQuestion";
import QuestionDetails from "./Questions/QuestionDetails";
import QuestionsTable from "./Questions/QuestionsTable";

const Question = () => {
  return (
    <Router>
      <QuestionsTable path="/" />
      <CreateQuestion path="create" />
      <QuestionDetails path="question-details" />
    </Router>
  );
};
export default Question;
