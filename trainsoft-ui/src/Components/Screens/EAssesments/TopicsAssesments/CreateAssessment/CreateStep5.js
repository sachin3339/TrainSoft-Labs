import { useEffect, useState, useContext } from "react";
import RestService from "../../../../../Services/api.service";
import AppContext from "../../../../../Store/AppContext";
import useToast from "../../../../../Store/ToastHook";
import { Button } from "@material-ui/core";
import { ICN_UPLOAD } from "../../../../Common/Icon";
import { Formik, Field, validateYupSchema } from "formik";
import Submit from "../../../Assessment/common/SubmitButton";

import YES_ICON from "../../../../../Assets/Images/yes.png"
import "../topic.css";
import { navigate } from "../../../../Common/Router";
import AssessmentContext from "../../../../../Store/AssessmentContext";


const CreateStep5 = ({ location, handleNext, handleBack }) => {
    const Toast = useToast()
    const { spinner,user } = useContext(AppContext)
    const {  assessmentVal } = useContext(AssessmentContext)


    // Create Topic
    const createAssessment = async (payload) => {
        spinner.hide("Loading... wait");
        try {
            RestService.createQuestion(payload).then(
                response => {
                    Toast.success({ message: "Topic added successfully" ,time: 2000})
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on createTopic()", err)
        }
    }

    const copyUrl = () =>{
        let copyText = document.getElementById("copy_url");
        let textArea = document.createElement("textarea");
        textArea.value = copyText.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        Toast.success({ message: 'Url is copy successfully', time: 2000});
      }

    return (
        <>
            <Formik
                onSubmit={(value) => createAssessment(value)}
                initialValues={{ file: '' }}
            // validationSchema={schema}
            >
                {({ handleSubmit, isSubmitting, dirty, setFieldValue, values }) => (
                    <form onSubmit={handleSubmit} className="create-batch">
                        <div className="row jcc py-5">
                            <div className="col-sm-5">
                                <div className="text-center"><img src={YES_ICON}/></div>
                                    <div className="title-lg text-center">Assessment successfully created!</div>
                                    <div className=" text-center py-2">Copy the below URL to share with the assessees manually</div>
                                    <div className="file-upload">
                                        <div className="upload-width" id="copy_url">
                                            
                                            {`https://www.trainsoft.io/assessment/${assessmentVal.sid}/${user.companySid}/0`}
                                        </div>
                                        <div>
                                        <Button variant="contained" color="primary" component="span"  onClick={()=>copyUrl()}>
                                                 Copy
                                        </Button>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        
                        <div className=" jcc my-3">
                            <div>
                                <Submit onClick={handleNext} onClick={()=>{navigate("topic-details",{state :{ title: "Topics",
                                 subTitle: "Assessment",
                                 path: "topicAssesment",}})}}>Finish</Submit>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </>
    );
};


export default CreateStep5;
