import { useState } from 'react';
import { SketchField, Tools } from 'react-sketch';
import { ICN_PAINT, ICN_PEN, ICN_SELECT, ICN_STOP } from '../../../Constant/Icon';
import './boardStyle.css'
const WhiteBoard = () => {
    const [toolType, setToolType] = useState(Tools.Selected)
    return (
        <div className="whiteboard">
            <div className="aic">
                <div className="board-menu bg-secondary">
                    <div onClick={()=> setToolType(Tools.Selected)} className="board-btn">
                        {ICN_SELECT}
                    </div>
                    <div className="board-btn" onClick={()=> setToolType(Tools.Pencil)}>
                        {ICN_PEN}
                    </div>
                    <div className="board-btn" onClick={()=> setToolType(Tools.Rectangle)}>
                        {ICN_STOP}
                    </div>
                    <div className="board-btn" onClick={()=> setToolType(Tools.Circle)}>
                        {ICN_PAINT}
                    </div>
                    {/* <div className="board-btn">
                        {ICN_SELECT}
                    </div>
                    <div className="board-btn">
                        {ICN_SELECT}
                    </div>
                    <div className="board-btn">
                        {ICN_SELECT}
                    </div> */}
                </div>
                <div className="full-w">
                <SketchField
                    width='900px'
                    className="board-style"
                    height='568px'
                    tool={Tools.Rectangle}
                    lineColor='black'
                    lineWidth={3} />
                    </div>
            </div>
        </div>)
}

export default WhiteBoard