import React, { useState } from 'react'
import Editor from "@monaco-editor/react";
import './codeEditor.css'
import { Language } from './Language';
import { Dropdown } from 'react-bootstrap';
import { CustomToggle } from '../../../Services/MethodFactory';
import { ICN_ARROW_DOWN, ICN_DOWNLOAD, ICN_FULL_SCREEN, ICN_PLAY, ICN_PUBLISH, ICN_SAVE, ICN_STAR_HALF } from '../../../Constant/Icon';
const CodeEditor = ()=>{
    const [lang, setLang] = useState(Language[0])
    const [lightTheams,setLightTheams] = useState(true)

    return (<>
        <div className="jcb">
            <div className=""></div>
            <div className="editor-tab">
                <div>
                <Dropdown className="dropdown-menus">
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                        <div className="editor-tab-w">{lang.language} {ICN_ARROW_DOWN}</div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu as="div" align="right">
                        {Language.map(res=> <Dropdown.Item onClick={()=> setLang(res)}>{res.language}</Dropdown.Item> )}
                    </Dropdown.Menu>
                </Dropdown>
                </div>
                <div className="editor-btn">
                    <div>
                       {ICN_PLAY}
                    </div>
                    <div>
                        {ICN_DOWNLOAD}
                    </div>
                    <div className={`rotate-45 ${lightTheams ? '': 'color-blue'}` } onClick={()=> setLightTheams(!lightTheams)}>
                       <span >{ICN_STAR_HALF}</span> 
                    </div>
                    <div>
                      {ICN_FULL_SCREEN}
                    </div>
                    
                </div>
            </div>
        </div>
        <Editor
             height="100%"
             width="100%"
             defaultLanguage={lang.language}
             defaultValue={lang.value}
             path={lang.name}
             theme={ lightTheams ? "vs-light" : "vs-dark"}
          />
    </>)

}

export default CodeEditor