import {  useState, useContext } from "react";
import RestService from "../../../../../Services/api.service";
import AppContext from "../../../../../Store/AppContext";
import useToast from "../../../../../Store/ToastHook";
import { Button } from "@material-ui/core";
import { ICN_UPLOAD } from "../../../../Common/Icon";
import { Formik } from "formik";
import Submit from "../../../Assessment/common/SubmitButton";
import AssessmentContext from "../../../../../Store/AssessmentContext";
import GLOBELCONSTANT from "../../../../../Constant/GlobleConstant";
import { navigate } from "../../../../Common/Router";

import "../topic.css";


const CreateStep4 = ({ location, handleNext, handleBack }) => {
    const Toast = useToast()
    const [url, setUrl] = useState(null)
    const { spinner, user } = useContext(AppContext)
    const { assessmentVal } = useContext(AssessmentContext)


    // generate url
    const generateUrl = async (pageNo = "1") => {
        spinner.show("Loading... wait");
        try {
            let { data } = await RestService.generateUrl(assessmentVal.sid)
            Toast.success({ message: "Url generated successfully" })
            console.log(data)
            setUrl(data)
            spinner.hide();
        } catch (err) {
            spinner.hide();
            console.error("error occur on generateUrl()", err)
        }
    }


    // upload files
    const uploadAsses = async (e) => {
        try {
            spinner.show("Please wait...");
            let header = {
                assessSid: assessmentVal.sid,
                assessUrl: `https://www.trainsoft.io/assessment?assessmentSid=${assessmentVal.sid}&companySid=${user.companySid}`
            }
            let formData = new FormData();
            formData.append('file', e);
            let res = await RestService.uploadAssParticipant(formData, header)
            spinner.hide();
            Toast.success({ message: 'Bulk Upload successfully', time: 2000 });
        } catch (err) {
            spinner.hide();
            console.error("error occur on uploadCreateListing()", err)
        }
    }



    // useEffect(()=>{
    //     !assessmentVal.url && generateUrl()
    // },[])

    return (
        <>
            <Formik
                onSubmit={(value) => { }}
                initialValues={{ file: '' }}
            // validationSchema={schema}
            >
                {({ handleSubmit, isSubmitting, dirty, setFieldValue, values }) => (
                    <form onSubmit={handleSubmit} className="create-batch">
                        <div className="row jcc">
                            <div className="col-sm-5">
                                <div className="text-center my-2">
                                    <Button onClick={() => generateUrl()} variant="contained" color="primary" component="span">
                                        Generate Url
                            </Button>
                                </div>
                                <div className="bulk-upload mt-4">
                                    <div className="title-lg">Upload Assessees in Bulk</div>
                                    <div className="file-upload">
                                        <div>
                                            {values?.file ? values?.file.name : "No File Uploaded Yet"}
                                        </div>
                                        <div>
                                            <input className={""} id="contained-button-file" onChange={(e) => uploadAsses(e.target.files[0])} type="file" />
                                            <label className="mb-0" htmlFor="contained-button-file">
                                                <Button variant="contained" color="primary" component="span">
                                                    <span className="mr-2">{ICN_UPLOAD}</span> Upload
                                                </Button>
                                            </label>
                                        </div>
                                    </div>
                                    <a href={GLOBELCONSTANT.UPLOAD_ASSES_TEMPLATE} className="mt-2 link">Download Template</a>
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
                                <Submit onClick={()=>{navigate("topic-details",{state :{ title: "Topic",
                                 subTitle: "Topic",
                                 path: "topicAssesment",}})}} style={{ background: "#0000003E", color: "black", marginRight: "10px", }}>
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
