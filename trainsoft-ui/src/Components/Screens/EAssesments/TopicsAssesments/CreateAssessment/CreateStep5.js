import { useEffect, useState, useContext } from "react";
import RestService from "../../../../../Services/api.service";
import AppContext from "../../../../../Store/AppContext";
import useToast from "../../../../../Store/ToastHook";
import { Button } from "@material-ui/core";
import { ICN_UPLOAD } from "../../../../Common/Icon";
import { Formik, Field, validateYupSchema } from "formik";
import Submit from "../../../Assesment/common/SubmitButton";
import YES_ICON from "../../../../../Assets/Images/yes.png"
import "../topic.css";
import { navigate } from "../../../../Common/Router";


const CreateStep5 = ({ location, handleNext, handleBack }) => {
    const Toast = useToast()
    const { spinner } = useContext(AppContext)


    // Create Topic
    const createAssessment = async (payload) => {
        spinner.hide("Loading... wait");
        try {
            RestService.createQuestion(payload).then(
                response => {
                    Toast.success({ message: "Topic added successfully" })
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
                                        <div>
                                            {values?.file ? values?.file.name : "No File Uploaded Yet"}
                                        </div>
                                        <div>
                                        <Button variant="contained" color="primary" component="span">
                                                 Copy
                                        </Button>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        
                        <div className=" jcc my-3">
                            <div>
                                <Submit onClick={handleNext} onClick={()=>{navigate("topic-details",{state :{ title: "Topic",
                                 subTitle: "Topic",
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
