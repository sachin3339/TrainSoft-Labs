import './session.css'
const Session = ()=>{
    const listValue = [
        { name:"OOAD Methodology",date:"07/06/2019" },
        { name:"Charteristic and features of OOP",date:"07/06/2019" },
        { name:"Development Processes",date:"07/06/2019" },
    ]
    return(<>
        <div className="session-container">
            {listValue.map(res=>
                 <div className="se-list">
                    <div className="se-name">
                        <div>s</div>
                        <div>{res.name}</div>
                    </div>
                     <div className="se-date">
                        <div>{res.date}</div>
                        <div></div>
                    </div>
                </div>
            )}
                 
        </div>
    </>)
}
export default Session