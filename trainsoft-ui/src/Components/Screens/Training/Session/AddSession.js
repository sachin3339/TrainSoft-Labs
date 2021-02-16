import { Formik } from "formik"
import { BsModal } from "../../../Common/BsUtils"
import { Button } from "../../../Common/Buttons/Buttons"
import { TextInput } from "../../../Common/InputField/InputField"

const AddSession = ({ show, setShow }) => {

    return (<>
        <BsModal {...{ show, setShow, headerTitle: "", size: "lg" }}>
            <div className="">
                <Formik
                    initialValues={{
                        agenda: '',
                        des: ''
                    }}
                    onSubmit={(values) => {
                        console.log(values)
                    }}
                >
                    {({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <TextInput name="agenda" label="Agenda" />
                            <TextInput name="desc" label="Description" />
                        </form>

                    )}
                </Formik>
                <Button className="btn-block">Conform</Button>
            </div>
        </BsModal>
    </>)
}
export default AddSession