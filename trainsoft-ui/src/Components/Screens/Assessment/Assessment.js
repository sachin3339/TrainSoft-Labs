import { useContext, useEffect, useState } from "react";
import RestService from "../../../Services/api.service";
import AppContext from "../../../Store/AppContext";
import { AssessmentContext, AssessmentProvider } from "./AssesementContext";
import { AssessmentDialog } from "./AssessmentDialog";
import AssessmentBody from "./AssessmentBody/AssesmentBody";
import Sidebar from "./Sidebar/Sidebar";
import AppUtils from "../../../Services/Utils";
import { dummyQuestions } from "./mock";
const Assessment = () => {
  return (
    <AssessmentProvider>
      <Content />
    </AssessmentProvider>
  );
};

const Content = () => {
    const { user, spinner } = useContext(AppContext)
    const { dialogOpen, setQuestions, setQuestionIndex, setQuestion } = useContext(AssessmentContext);
    const [questionsList, setQuestionsList] = useState(dummyQuestions);

    // get All session
    const getAssessmentQuestions = async (
            assessmentSid = "", 
            virtualAccountSid = ""
        ) => {
        try {
            spinner.show();
            // setQuestionsList(dummyQuestions);
            // setQuestions(dummyQuestions);
            // setQuestionIndex(0);
            // setQuestion(dummyQuestions[0]);
            RestService.getQuestionAnswer(assessmentSid, virtualAccountSid).then(
                response => {
                    if(AppUtils.isNotEmptyArray(response.data)) {
                        setQuestionsList(response.data);
                        setQuestions(dummyQuestions);
                        setQuestionIndex(0);
                        setQuestion(response.data[0])
                    }
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            spinner.hide();
            console.error("Error occur on getAssessmentQuestions()--", err);
        }
    }

    useEffect(() => {
        !dialogOpen && getAssessmentQuestions("659253CF91270AD9421C17EA0EB550305576E7943120E023722C03A9877E92BD", "479F0242214E4AA4B3D8A9866FD2B5BED5671ABFA27E4C77A75CAA5E0B3D527B")
    }, [dialogOpen])

    return <>
        {
            dialogOpen 
            ? <AssessmentDialog />
            : <div style={{ display: "flex" }}>
                 { 
                    AppUtils.isNotEmptyArray(questionsList) 
                    &&  <>
                        <Sidebar {...{questions: questionsList}}/>
                        <AssessmentBody {...{questions: questionsList}}/>
                    </>
                 }
               
            </div>
        }
    </>;
};

export default Assessment;
