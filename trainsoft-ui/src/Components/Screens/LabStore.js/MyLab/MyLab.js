import { Form, Formik } from "formik";
import { SelectInput } from "../../../Common/InputField/InputField"
import LabList from "../LabList"
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { BsCheckbox } from "../../../Common/BsUtils";

const MyLab = ({ dummyData2 }) => {
    return (<>
        <div className="aic jcb">
            <div className="title-md">Lab Filter</div>
            <div className="aic">
                <div className="mx-3"><BsCheckbox label="All Labs" id="all-labs"/></div><div><BsCheckbox label="Requested Lab" id="request-labs"/> </div>
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-md-5 ">
                <Formik
                    initialValues={{
                        department: '',
                        category: '',
                        course: ''
                    }}
                    onSubmit={values => {
                        // same shape as initial values
                        console.log(values);
                    }}
                >
                    <Form>
                        <SelectInput name="department" label="Department" option={["Information Technology", "Help Desk", "Tech Support Team"]} />
                        <SelectInput name="category" label="Category" option={["Infrastructure & DevOps", "Website Development",
                            "App Development", "Big Data", "Machine Learning", "Security Backups and recovery"]} />
                        <SelectInput name="course" label="Course" option={["Advanced Java", "Python fundamentals", "Cloud computing and its essential"
                            , "IT Management", "R for Data Science"]} />
                    </Form>
                </Formik>
                    <div className="box-shadow py-5">
                    <div className="flx">
                                <div className="text-center ">
                                    <CircularProgressbar
                                        maxValue="1000"
                                        minValue="1" value="580"
                                        text={`580`}
                                        styles={buildStyles({
                                            trailColor: "#F5FBFF",
                                            pathColor: "#00CCF2",
                                        })} />
                                    <div className="mt-2">Allocated</div>
                                </div>
                                <div className="text-center mx-4">
                                    <CircularProgressbar
                                        value="70"
                                        text={`70%`}
                                        styles={buildStyles({
                                            trailColor: "#F5FBFF",
                                            pathColor: "#2D62ED",
                                        })} />
                                    <div className="mt-2">Remaining</div>
                                </div>

                                <div className="text-center">
                                    <CircularProgressbar
                                        maxValue="1000"
                                        minValue="1" value="789"
                                        text={`789`}
                                        styles={buildStyles({
                                            trailColor: "#F5FBFF",
                                            pathColor: "#7D00B5",
                                        })} />
                                    <div className="mt-2">Total</div>
                                </div>

                            </div>
                    </div>
            </div>
            <div className="col-md-7">
                <LabList myLab={true} list={dummyData2} />
            </div>
        </div>
    </>)
}
export default MyLab