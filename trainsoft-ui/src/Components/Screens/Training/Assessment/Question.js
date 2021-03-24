import { Formik } from "formik"
import { useState } from "react"
import { BsModal } from "../../../Common/BsUtils"
import { Button } from "../../../Common/Buttons/Buttons"
import { Checkbox, SelectInput, TextArea, TextInput } from "../../../Common/InputField/InputField"

const Question = ({ show, setShow, setStep }) => {

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
                        <TextInput label="Your question" name="title" />
                        <div className="row aic">
                            <div className="col-sm-6">
                                <SelectInput label="Question Type" option={['Single Choice', 'Multiple Choice', 'Open Ended/Essay', 'Fill in the Blanks']} name="questionType" />
                            </div>
                            <div className="col-sm-4 flx">
                                <Checkbox label="Answer required" name="answerRequire" id="aa1" />
                                <Checkbox label="Randomize" name="randomize" id="ran1" />
                            </div>
                            <div className="col-sm-6">
                                <TextInput label="Score" name="score" />
                            </div>
                            <div className="col-sm-4">
                                <Checkbox label="Display Score" name="displayScore" id="displayScore" />
                            </div>
                        </div>
                        <TextInput label="Description (Optional)" name="description" />
                        <TextInput label="Answer title" name="answerTitle" />
                        <div className="jcb">
                            <div>
                                <Button className=" py-2 mt-2 mr-2" onClick={() => { setStep('info') }}> Back </Button>
                                <Button className=" py-2 mt-2" onClick={() => { setStep('setting') }}> Next </Button>
                            </div>
                            <div>
                                <Button className=" py-2 mt-2" onClick={() => { setStep('setting') }}> Cancel </Button>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    </>)
}
export default Question