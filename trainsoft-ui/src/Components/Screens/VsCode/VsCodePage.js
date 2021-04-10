import GLOBELCONSTANT from "../../../Constant/GlobleConstant"

const VsCodePage = ()=>{
    return(<>
        <object type="text/html" data={GLOBELCONSTANT.VSCODE_PATH} style={{ width: "100%", height: "100%" }}>
            <p className="px-4">Loading... VsCode</p>
        </object> 
    </>)
}
export default VsCodePage 