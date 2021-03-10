import { Formik } from "formik"
import { useState } from "react"
import { BsModal } from "../../../Common/BsUtils"
import { Button } from "../../../Common/Buttons/Buttons"
import { TextArea, TextInput } from "../../../Common/InputField/InputField"

const AddAssessment = ({ show, setShow }) => {
    const [title, setTitle] = useState('')
    const [isConform, setIsConform] = useState(false)
    return (<>
        <BsModal {...{ show, setShow, headerTitle: "Assessment", size: "lg" }}>
            <div className="">
                {!isConform && <div>
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
                            </form>
                        )}
                    </Formik>
                    <Button className=" py-2 mt-2" onClick={() => { setTitle("Session preview"); setIsConform(true) }}>Conform</Button>
                </div>}
            </div>
        </BsModal>
    </>)
}
export default AddAssessment