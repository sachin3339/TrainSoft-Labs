import {Modal} from 'react-bootstrap'
import { ICN_CLOSE } from '../../Constant/Icon'
const ModalGen = ({ children, setShow, show, headerTitle,size="md" }) => {
    return (
        <Modal
            size={size}
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Body className="px-5 py-4">
                <div className="jcb mb-3">
                    <div className="title-md ">{headerTitle}</div>
                    <div><div className="circle-md" onClick={() => setShow(false)}>
                        {ICN_CLOSE}
                    </div>
                    </div>
                </div>
                {children}
            </Modal.Body>

        </Modal>
    )
}

export default ModalGen