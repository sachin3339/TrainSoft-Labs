import { useState,useEffect } from 'react';
import './boardStyle.css'

// import { SketchField, Tools } from 'react-sketch';
import { ICN_CIRCLE, ICN_PAINT, ICN_PEN, ICN_SELECT, ICN_STOP, ICN_TEXT_FIELD , ICN_CALL_MADE, ICN_EDIT, ICN_DELETE} from '../../../Common/Icon';

const WhiteBoard = ({className}) => {
    // const [toolType, setToolType] = useState(Tools.Select)
    const [color,setColor] = useState("black")
    const [canUndo,setCanUndo] = useState(false)
    const [canRedo,setCanRedo] = useState(false)
    const [drawing,setDrawing] = useState([])
    const [sketch,setSketch] = useState(null)

    // const _addText = () => sketch.addText('Text');
    // const _removeSelected = () => sketch.removeSelected()

//    const _onSketchChange = () => {
//         let prev = canUndo;
//         let now = sketch.canUndo();
//         if (prev !== now) {
//             setCanUndo(now)
//         }
//       };

    //  const  _removeMe = index => {
    //     let drawings = drawing;
    //     drawings.splice(index, 1);
    //     setDrawing(drawings)
    //   };
    
    //   const _undo = () => {
    //     sketch.undo();
    //     setCanRedo(sketch.canUndo());
    //     setCanUndo( sketch.canRedo())
    //   };
    
    //   const _redo = () => {
    //     sketch.redo();
    //     setCanRedo(sketch.canUndo());
    //     setCanUndo( sketch.canRedo())
    //   };
        

    return (
        <div className={` whiteboard ${className}`}>
            <div className="aic">
                <div className="board-menu bg-secondary">
                    {/* <div  onClick={()=> setToolType(Tools.Select)} className={`board-btn ${toolType === Tools.Select ? 'board-btn-active' : ''}`}>
                        {ICN_SELECT}
                    </div>
                    <div className={`board-btn ${toolType === Tools.Pencil ? 'board-btn-active' : ''}`} onClick={()=> setToolType(Tools.Pencil)}>
                        {ICN_PEN}
                    </div>
                    <div className={`board-btn ${toolType === Tools.Rectangle ? 'board-btn-active' : ''}`} onClick={()=> setToolType(Tools.Rectangle)}>
                        {ICN_STOP}
                    </div>
                    <div className={`board-btn ${toolType === Tools.Circle ? 'board-btn-active' : ''}`} onClick={()=> setToolType(Tools.Circle)}>
                        {ICN_CIRCLE}
                    </div>
                    <div className={`board-btn`} onClick={()=> _addText()}>
                        {ICN_TEXT_FIELD}
                    </div>
                    <div className={`board-btn `} onClick={()=> _removeSelected()}>
                        {ICN_DELETE}
                    </div>
                    <div className={`board-btn wb-color`} onClick={()=> setToolType(Tools.Circle)}>
                      <input type="color" id="favcolor" onChange={(e)=> setColor(e.target.value)} name="favcolor" value={color}/>
                    </div> */}
                   
                   
                    {/* <div className={`board-btn ${toolType === Tools.Select ? 'board-btn-active' : ''}`}>
                        {ICN_SELECT}
                    </div>
                    <div className={`board-btn ${toolType === Tools.Select ? 'board-btn-active' : ''}`}>
                        {ICN_SELECT}
                    </div>
                    <div className={`board-btn ${toolType === Tools.Select ? 'board-btn-active' : ''}`}>
                        {ICN_SELECT}
                    </div> */}
                </div>

                <div className="full-w">
                {/* <SketchField
                    width='920px'
                    className="board-style"
                    height='570px'
                    tool={toolType}
                    lineColor={color}
                    fillColor={color}
                    ref={c => setSketch(c)}
                    onChange={_onSketchChange}
                    lineWidth={3} /> */}
                    </div>
            </div>
        </div>)
}

export default WhiteBoard