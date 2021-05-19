import { useState, useEffect, useContext } from "react";
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
import DynamicTable from "../../../../Common/DynamicTable/DynamicTable";
import "../topic.css";



const CreateStep4 = ({ location, handleNext, handleBack }) => {
    const Toast = useToast()
    const { spinner, user } = useContext(AppContext)
    const { initialAssessment } = useContext(AssessmentContext)
    const [assessmentUser, setAssessmentUser] = useState([])

    const [configuration, setConfiguration] = useState({
        columns: {
            name: {
                title: "ASSESSEE NAME",
                sortDirection: null,
                sortEnabled: true,
                isSearchEnabled: false,
                render: (data) => (
                    <div style={{ display: "flex", alginItems: "center" }}>
                        <div className="dt-name">{data.name}</div>
                    </div>
                ),
            },
            email: {
                title: "EMAIL",
                sortDirection: null,
                sortEnabled: true,
                isSearchEnabled: false,
            },
            status: {
                title: "SUBMISSION STATUS",
                sortDirection: null,
                sortEnabled: true,
                isSearchEnabled: false,
                render: (data) => (
                    <div style={{ color: data.status === "SUBMITTED" ? "#1C9B60" : "" }}>
                        {data.status}{" "}
                    </div>
                ),
            },
            submittedOn: {
                title: "SUBMITTED ON",
                sortDirection: null,
                sortEnabled: true,
                isSearchEnabled: false,
                render: (res) => <div>-</div>
            },
            score: {
                title: "Score",
                sortDirection: null,
                sortEnabled: true,
                isSearchEnabled: false,
                render: (data) => <div>-</div>
            }
        },
        headerTextColor: "#454E50", // user can change table header text color
        sortBy: null, // by default sort table by name key
        sortDirection: false, // sort direction by default true
        updateSortBy: (sortKey) => {
            configuration.sortBy = sortKey;
            Object.keys(configuration.columns).map(
                (key) =>
                (configuration.columns[key].sortDirection =
                    key === sortKey ? !configuration.columns[key].sortDirection : false)
            );
            configuration.sortDirection =
                configuration.columns[sortKey].sortDirection;
            setConfiguration({ ...configuration });
        },
        actionCustomClass: "no-chev esc-btn-dropdown", // user can pass their own custom className name to add/remove some css style on action button
        actionVariant: "", // user can pass action button variant like primary, dark, light,
        actionAlignment: true, // user can pass alignment property of dropdown menu by default it is alignLeft
        // call this callback function onSearch method in input field on onChange handler eg: <input type="text" onChange={(e) => onSearch(e.target.value)}/>
        // this search is working for search enable fields(column) eg. isSearchEnabled: true, in tale column configuration
        searchQuery: "",
        tableCustomClass: "ng-table sort-enabled", // table custom class

        clearSelection: false,
    });

    // generate url
    const generateUrl = async (pageNo = "1") => {
        try {
            let { data } = await RestService.generateUrl(initialAssessment.sid)
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
                assessSid: initialAssessment.sid,
                assessUrl: `https://www.trainsoft.io/assessment/${initialAssessment.sid}/${user.companySid}`
            }
            let formData = new FormData();
            formData.append('file', e);
            let res = await RestService.uploadAssParticipant(formData, header)
            spinner.hide();
            getAssestUser()
            Toast.success({ message: 'Bulk Upload successfully', time: 2000 });
        } catch (err) {
            Toast.error({ message: err.response?.data?.message });
            spinner.hide();
            console.error("error occur on uploadCreateListing()", err)
        }
    }

    // generate users
    const getAssestUser = async (pageNo = "1") => {
        try {
            spinner.show("Please wait...");
            let { data } = await RestService.getAssestUser(initialAssessment.sid)
            spinner.hide();
            setAssessmentUser(data)
        } catch (err) {
            spinner.hide();
            console.error("error occur on getAssestUser()", err)
        }
    }


    useEffect(() => {
        getAssestUser()
        generateUrl()
    }, [])

    return (
        <>
            {assessmentUser.length > 0 ?
                <DynamicTable
                    {...{
                        configuration,
                        sourceData: assessmentUser,
                    }}
                />
                :
                <Formik
                    onSubmit={(value) => { }}
                    initialValues={{ file: '' }}
                >
                    {({ handleSubmit, isSubmitting, dirty, setFieldValue, values }) => (
                        <form onSubmit={handleSubmit} className="create-batch">
                            <div className="row jcc">
                                <div className="col-sm-6">
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

                        </form>
                    )}
                </Formik>
            }
            <div className="ass-foo-border">
                <div>
                    <Submit onClick={handleBack} style={{ background: "#0000003E", color: "black", marginRight: "10px", }}> Back</Submit>
                </div>

                <div>
                    <Submit onClick={() => {
                        navigate("topic-details", { state: { title: "Topics", subTitle: "Assessment", path: "topicAssesment", } })
                    }} style={{ background: "#0000003E", color: "black", marginRight: "10px", }}>
                                Cancel
                         </Submit>
                    <Submit onClick={handleNext}>Complete</Submit>
                </div>
            </div>
        </>
    );
};


export default CreateStep4;
