import { useEffect, useState, useContext } from "react";
import RestService from "../../../../../Services/api.service";
import AppContext from "../../../../../Store/AppContext";
import useToast from "../../../../../Store/ToastHook";
import { Button } from "@material-ui/core";
import { ICN_UPLOAD } from "../../../../Common/Icon";
import { Formik, Field, validateYupSchema } from "formik";
import Submit from "../../../Assesment/common/SubmitButton";
import "../topic.css";


const CreateStep4 = ({ location, handleNext, handleBack }) => {
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
                        <div className="row jcc">
                            <div className="col-sm-5">
                                <div className="bulk-upload mt-4">
                                    <div className="title-lg">Upload Assessees in Bulk</div>
                                    <div className="file-upload">
                                        <div>
                                            {values?.file ? values?.file.name : "No File Uploaded Yet"}
                                        </div>
                                        <div>
                                            <input
                                                accept="image/*"
                                                className={""}
                                                id="contained-button-file"
                                                onChange={(e) => setFieldValue("file", e.target.files[0])}
                                                type="file"
                                            />
                                            <label className="mb-0" htmlFor="contained-button-file">
                                                <Button variant="contained" color="primary" component="span">
                                                    <span className="mr-2">{ICN_UPLOAD}</span> Upload
                                                  </Button>
                                            </label>
                                        </div>
                                    </div>
                                    <p>Download Template</p>

                                </div>
                                <div className="text-muted  text-center my-4">Or</div>
                                <div className="title-md text-center">Copy assessment URL and Send to assessees manually later</div>
                            </div>
                        </div>

                        <div className="ass-foo-border">
                            <div>
                                <Submit onClick={handleBack} style={{ background: "#0000003E", color: "black", marginRight: "10px", }}> Back</Submit>
                            </div>

                            <div>
                                <Submit style={{ background: "#0000003E", color: "black", marginRight: "10px", }}>
                                    Cancel
                  </Submit>
                                <Submit onClick={handleNext}>Complete</Submit>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </>
    );
};


export default CreateStep4;
