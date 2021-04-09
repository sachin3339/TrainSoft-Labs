import { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import GLOBELCONSTANT from '../../../../Constant/GlobleConstant';
import { Button } from '../../../Common/Buttons/Buttons';
import './ClassNote.css'



const ClassNotes = ()=>{
    const [fieldValue, setFieldValue] = useState('')
    return (<div className="full-h column">
             <ReactQuill
                    modules={GLOBELCONSTANT.QUILL}
                    value={''}
                    onChange={(val) => setFieldValue("body", val)}
                />
                <div className="flx px-3 jce"><Button className="px-4">Save</Button></div>
    </div>)
}
export default ClassNotes