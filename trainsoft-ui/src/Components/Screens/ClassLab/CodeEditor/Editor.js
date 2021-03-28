import React, { useState, useEffect } from 'react'
import Editor from "@monaco-editor/react";
const Editors = ({ lang, handleEditorDidMount, lightTheams}) => {
    const [language, setLanguage] = useState(lang.value)

    useEffect(() => {
        setLanguage(lang.value)
    }, [lang.value])

    return (<>
        <Editor
            height="400px"
            width="100%"
            defaultLanguage={lang.language}
            defaultValue={language}
            theme={lightTheams ?  "vs-light" : "vs-dark" }
            onMount={handleEditorDidMount}
        />
    </>)
}
export default Editors