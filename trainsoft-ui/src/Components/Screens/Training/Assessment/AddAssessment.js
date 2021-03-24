import { Formik } from "formik"
import { useState } from "react"
import { BsModal } from "../../../Common/BsUtils"
import { Button } from "../../../Common/Buttons/Buttons"
import { TextArea, TextInput } from "../../../Common/InputField/InputField"
import AdvanceOption from "./AdvanceOption"
import Question from "./Question"
import QuizSetting from "./QuizSetting"

const AddAssessment = ({ show, setShow }) => {

    const [step,setStep] = useState('info')
    return (<>
        <BsModal {...{ show, setShow, headerTitle: "Assessment", size: "lg" }}>
            <div className="">
                { step === 'info' && <Info {...{setStep}}/>}
                { step === 'question' && <Question {...{setStep}}/> }
                { step === 'setting' && <QuizSetting {...{setStep}}/>}
                {/* { step=== 'advance' && <AdvanceOption {...{setStep}}/>} */}
            </div>
        </BsModal>
    </>)
}
export default AddAssessment



const Info = ({setStep}) => {
    return(
        <div>
            <Formik
                initialValues={{
                    title: '',
                    description:''
                }}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <TextInput label="Assessment title" name="title"/>
                        <TextArea name="description" label="Description" />
                        <Button className=" py-2 mt-2" onClick={() => {setStep('question') }}>Save and Next </Button>
                    </form>
                )}
            </Formik>
        </div>
    )
}