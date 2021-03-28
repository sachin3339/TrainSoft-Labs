import React, { useState, useRef, useEffect, useContext } from 'react'
import { Language } from './Language';
import { Dropdown, Spinner } from 'react-bootstrap';
import { CustomToggle } from '../../../../Services/MethodFactory';
import axios from 'axios';
import { ICN_ARROW_DOWN, ICN_DOWNLOAD, ICN_FULL_SCREEN, ICN_PLAY, ICN_STAR_HALF } from '../../../Common/Icon';
import AppContext from '../../../../Store/AppContext';
import Editors from './Editor';
import './codeEditor.css'

const CodeEditor = ({themesColor=false}) => {
    const {spinner} = useContext(AppContext) 
    const [inputData, setInputData] = useState('')
    const editorRef = useRef(null);
    const [lang, setLang] = useState(Language[0])
    const [lightTheams, setLightTheams] = useState(false)
    const [output, setOutput] = useState('')
    const [inputTab, setInputTab] = useState(true)
    const [spinners,setSpinners] = useState(false)
    const [language,setLanguage] =useState()
    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
    }

    const runCode = () => {
        setSpinners(true)
        const payload = {
            "stdin": inputData,
            "script": editorRef.current.getValue(),
            "language": lang.language,
        }
        axios.post(`http://ec2-65-1-14-123.ap-south-1.compute.amazonaws.com/insled/v1/jdoodle/execute`, payload)
            .then(({ data }) => {
                setOutput(data.output)
                setInputTab(false)
                setSpinners(false)
            })
    }
    useEffect(() => {
        setOutput('')
        setInputTab('')
        setInputTab(true)
        setLanguage(lang.value)
    }, [lang])



    return (<>
    <div className="editor-wrapper">
        <div className="jcb">
            <div className=""></div>
            <div className="editor-tab">
                <div>
                    <Dropdown className="dropdown-menus">
                        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                            <div className="editor-tab-w">{lang.label} {ICN_ARROW_DOWN}</div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu as="div" align="right">
                            {Language.map(res => <Dropdown.Item onClick={() => setLang(res)}>{res.label}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="editor-btn">
                    <div onClick={() => runCode()}>
                        {spinners ? <><Spinner animation="border" size="sm" /></> : <div>{ICN_PLAY}</div>}
                    </div>
                    <div>
                        {ICN_DOWNLOAD}
                    </div>
                    <div className={`rotate-45 ${lightTheams ? '' : 'color-blue'}`} onClick={() => setLightTheams(!lightTheams)}>
                        <span >{ICN_STAR_HALF}</span>
                    </div>
                    <div>
                        {ICN_FULL_SCREEN}
                    </div>

                </div>
            </div>
        </div>
      {/* <Editor
            height="100%"
            width="100%"
            defaultLanguage={lang.language}
            defaultValue={language}
            theme={lightTheams ? "vs-light" : "vs-dark"}
            onMount={handleEditorDidMount}
        /> */}
       <Editors {...{lang,lightTheams,handleEditorDidMount}}/>
        
        <div className="py-2 column">
            <div className="flx">
                <div onClick={() => setInputTab(true)} className={`class-mode ${inputTab === true ? 'bg-primary' : ''}`}>Input</div>
                <div onClick={() => setInputTab(false)} className={`class-mode ${inputTab === false ? 'bg-primary' : ''}`}>Output</div>
            </div>
            {inputTab ?
                <div className="editor-output">
                    <div><textarea rows="3" placeholder="Enter input" className="form-control" onChange={(e) => setInputData(e.target.value)} type="text" /></div>
                </div>
                : <div className="editor-output">
                    <div>{output}</div>
                </div>
            }
        </div>
    </div>
    </>)

}

export default CodeEditor