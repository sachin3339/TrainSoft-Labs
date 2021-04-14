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
            axios.get(`http://ec2-65-1-145-196.ap-south-1.compute.amazonaws.com/run/lab?id=`+ id)
            .then(({ data }) => {
                window.open(createPortal(data))
            })
            
        }catch(err){
            console.error("error occur getDevelopmentLink()",err)
        }
    }

    return(<>
        
         <Button className="mr-2" onClick={()=>window.open("http://ec2-65-1-145-196.ap-south-1.compute.amazonaws.com:9011/#/home/project")}>Login user 1</Button><Button onClick={()=>window.open("http://ec2-65-1-145-196.ap-south-1.compute.amazonaws.com:9046/#/home/project")}>Login user 2</Button>

    </>)
}
export default DevelopmentEnv