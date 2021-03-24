import { Button } from "../../../Common/Buttons/Buttons"
import axios from 'axios';
import { navigate } from "../../../Common/Router";




const DevelopmentEnv =()=>{

   const createPortal = (data)=> {
        let val = data.domain
       try{
          let value = val.slice(0, -1)
           return  `${value}:${data.port}`
       }catch(err){
           console.error(err)
       }
    }

    // get development link
    const getDevelopmentLink = (id) =>{
        try{
            axios.get(`http://65.1.185.38/run/lab?id=`+ id)
            .then(({ data }) => {
                window.open(createPortal(data))
            })
            
        }catch(err){
            console.error("error occur getDevelopmentLink()",err)
        }
    }

    return(<>
        
         <Button className="mr-2" onClick={()=>getDevelopmentLink("learner1")}>Login user 1</Button><Button onClick={()=>getDevelopmentLink("learner2")}>Login user 2</Button>

    </>)
}
export default DevelopmentEnv