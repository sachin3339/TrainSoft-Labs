import { useState,useEffect } from 'react';
import './boardStyle.css'

import {SketchField,Tools} from '../../../Sketch';
import { ICN_CIRCLE, ICN_PAINT, ICN_PEN, ICN_SELECT, ICN_STOP, ICN_TEXT_FIELD , ICN_CALL_MADE, ICN_EDIT, ICN_DELETE} from '../../../Common/Icon';

const WhiteBoard = ({className}) => {
    const [toolType, setToolType] = useState(Tools.Select)
    const [color,setColor] = useState("black")
    const [fillColor,setFillColor] = useState("transparent")
    const [lineSize,setLineSize] = useState(2)
    const [canUndo,setCanUndo] = useState(false)
    const [canRedo,setCanRedo] = useState(false)
    const [drawing,setDrawing] = useState([])
    const [sketch,setSketch] = useState(null)

    const _addText = () => sketch.addText('Text');
    const _removeSelected = () => sketch.removeSelected()

   const _onSketchChange = () => {
        let prev = canUndo;
        let now = sketch.canUndo();
        if (prev !== now) {
            setCanUndo(now)
        }
      };

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

    const _download = () => {
        // console.save(sketch.toDataURL(), 'toDataURL.txt');
        // console.save(JSON.stringify(sketch.toJSON()), 'toDataJSON.txt');
    
        /*eslint-enable no-console*/
    
        let { imgDown } = this.refs;
        let event = new Event('click', {});
    
        imgDown.href = sketch.toDataURL();
        imgDown.download = 'toPNG.png';
        imgDown.dispatchEvent(event);
      };

            console.log(sketch)
    return (
        <div className={` whiteboard ${className}`}>
            <div className="aic">
                <div className="board-menu bg-secondary">
                    <div  onClick={()=> setToolType(Tools.Select)} className={`board-btn ${toolType === Tools.Select ? 'board-btn-active' : ''}`}>
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
                 
                    <div className={`board-btn `} onClick={()=> _download()}>
                        D
                    </div>
                   
                   
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
                <div className="board-menu-top  flx px-2">
                    <div  onClick={()=> setToolType(Tools.Select)} className={`aic`}>
                    <div>Fill</div>  
                     <div className={`board-btn wb-color`}>
                        <input type="color" id="color" onChange={(e)=> setFillColor(e.target.value)} name="favcolor" value={fillColor}/>
                     </div>
                     <div className="mx-2"> | </div>
                 </div>
                    <div  onClick={()=> setToolType(Tools.Select)} className={`aic`}>
                     <div>Line Color</div>  
                     <div className={`board-btn wb-color`}>
                        <input type="color" id="favcolor" onChange={(e)=> setColor(e.target.value)} name="favcolor" value={color}/>
                     </div>
                     {/* <div className="mx-2"> | </div> */}
                    </div>
                <div className="aic">
                    {/* <div className="aic">
                        <div className="mr-2">LineWidth</div>
                        <input min="1" max="100" onChange={(e)=>setLineSize(e.target.value)} className="bdLineW" type="number"/>
                    </div> */}
                {/* <input type="range" id="volume" onChange={(e)=>console.log(e.target.value)} name="volume"
                        min="1" max="100"/> */}
                {/* <label for="volume" className="ml-2">Volume</label> */}
                </div>
                </div>
                <SketchField
                    width='100%'
                    className="board-style"
                    tool={toolType}
                    lineColor={color}
                    fillColor={fillColor}
                    ref={c => setSketch(c)}
                    onChange={_onSketchChange}
                    lineWidth={lineSize} />
                    </div>
            </div>
        </div>)
}

export default WhiteBoard