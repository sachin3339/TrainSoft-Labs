import { Formik } from "formik"
import { useState } from "react"
import { BsModal } from "../../../Common/BsUtils"
import { Button } from "../../../Common/Buttons/Buttons"
import { Checkbox, SelectInput, TextArea, TextInput } from "../../../Common/InputField/InputField"

const AdvanceOption = ({ show, setShow , setStep}) => {
    return (<>
        <div>
            <Formik
                initialValues={{
                    title: '',
                    questionType: '',
                    score: '',
                    answerRequire: '',
                    randomize: '',
                    displayScore: '',
                    Description: ''
                }}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-sm-4">
                               <TextInput label="Time Limit" name="timeLimit" />
                            </div>
                            <div className="col-sm-3">
                               <SelectInput label="Question Type" option={['Second', 'Minutes', 'Hours', 'Days','Weeks']} name="questionType" />
                            </div>
                            <div className="col-sm-5">
                               <Checkbox label="Hide quiz time - display" name="HideQuiz" id="HideQuiz" />
                            </div>
                            <div className="small-text">Time limit for this quiz. 0 means no time limit.</div>
                        </div>
                        <div className="row aic">
                            <div className="col-sm-12">
                               <TextInput label="Passing Grade (%)" name="passingGrade" />
                               <div className="small-text">Set the passing percentage for this quiz</div>
                            </div>
                            <div className="col-sm-12">
                               <TextInput label="Max questions allowed to answer" name="passingGrade" />
                               <div className="small-text">This amount of question will be available for students to answer, and question will comes randomly from all available questions belongs with a quiz, if this amount greater than available question, then all questions will be available for a student to answer.</div>
                            </div>
                     
                        </div>
                        
                        <div className="jcb">
                            <div>
                                <Button className=" py-2 mt-2 mr-2" onClick={() => { setStep('setting') }}> Back </Button>
                                <Button className=" py-2 mt-2" onClick={() => { setStep('advance') }}> Save </Button>
                            </div>
                            <div>
                                {/* <Button className=" py-2 mt-2" onClick={() => { setIsConform(true); setStep('setting') }}> Cancel </Button> */}
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    </>)
}
export default AdvanceOption