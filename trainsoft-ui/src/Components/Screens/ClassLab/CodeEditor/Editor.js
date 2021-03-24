import React, { useState, useEffect } from 'react'
import Editor from "@monaco-editor/react";
const Editors =({lang,lightTheams,handleEditorDidMount})=>{
    const [language,setLanguage] = useState(lang.value)

    useEffect(() => {
        setLanguage(lang.value)
    }, [lang.value])

    return(<>
      <Editor
        height="100%"
        width="100%"
        defaultLanguage={lang.language}
        defaultValue={language}
        theme={"vs-dark"}
        onMount={handleEditorDidMount}
    />
        </>)
}
export default Editors