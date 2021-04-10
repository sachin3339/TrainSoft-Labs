import axios from "axios"
import { useState, useEffect, useContext } from "react"
import AppContext from "../../../Store/AppContext"



const VsCode = ()=>{
    const {user,ROLE,spinner} = useContext(AppContext) 
    const [link,setLink] = useState(null)

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
            spinner.show()
            let use= user.role === ROLE.INSTRUCTOR ? "learner1" : "learner2"

            // axios.get(`http://ec2-65-1-145-196.ap-south-1.compute.amazonaws.com/run/lab?id=`+use)
            // .then(({ data }) => {
            //     // setLink(createPortal(data))
            //      spinner.hide()
            //     // window.open(createPortal(data))
            // })
            setLink("http://ec2-65-1-145-196.ap-south-1.compute.amazonaws.com:9046/")
            spinner.hide()
            
        }catch(err){
            console.error("error occur getDevelopmentLink()",err)
        }
    }

    useEffect(() => {
        getDevelopmentLink()
    }, [])

    return(<>
       { link && <iframe  src={link} height="100%" width="100%" title="Iframe Example"> </iframe> }
    </>)
}

export default VsCode
