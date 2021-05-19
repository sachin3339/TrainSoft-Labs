import React, { useContext,useState,useEffect } from 'react'
import { Formik } from 'formik';
import { Checkbox, TextInput } from '../../Common/InputField/InputField';
import { Button } from '../../Common/Buttons/Buttons';
import { navigate } from '../../Common/Router';
import AppContext from '../../../Store/AppContext';
import useToast from "../../../Store/ToastHook";
import RestService from '../../../Services/api.service';
import AxiosService from '../../../Services/axios.service';
import { TokenService } from '../../../Services/storage.service';
import './auth.css'
import { ICN_TRAINSOFT } from '../../Common/Icon';
import GLOBELCONSTANT from '../../../Constant/GlobleConstant';
import AssessmentContext from '../../../Store/AssessmentContext';



const Login = ({location}) => {
    const {setUserValue,spinner} = useContext(AppContext)
    const {setCategory} = useContext(AssessmentContext)
    const [tabPanel,setTabPanel] = useState("login")
    const Toast = useToast();
    
    // on login the user
    const onLogin = (value) => {
        try {
            RestService.login(value).then(
                response => {
                        let data = response.data
                        data.name = response.data.appuser.name
                        data.vaRole = response.data.role
                        data.role = response.data.departmentVA?.departmentRole
                        data.accessType = response.data.appuser.accessType
                        data.employeeId = response.data.appuser.accessType
                        setUserValue("LOGIN",data)
                        AxiosService.init('',response.data?.jwtToken);
                        TokenService.saveToken(response.data?.jwtToken)
                        if(data.role === GLOBELCONSTANT.ROLE.ASSESS_USER){
                            navigate('/assessment', { state: { title: 'Dashboard'} })
                        }else{
                            data.role === GLOBELCONSTANT.ROLE.LEARNER ?  navigate('/home', { state: { title: 'Home'} }) :(data.role === GLOBELCONSTANT.ROLE.INSTRUCTOR || data.role === GLOBELCONSTANT.ROLE.SUPERVISOR) && navigate('/dashboard', { state: { title: 'Dashboard'} })
                        }
                        
 
                    },
                err => {
                    Toast.error({message: 'Invalid User Name / Password!'})
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            Toast.error({message: 'Invalid User Name / Password!'})
            console.error("Error occured on login page", err)
        }
    }

    // forgot password
    const forgetPwd = (value) => {
        try {
            spinner.show();
            RestService.forgetPwd(value.email).then(
                response => {
                    Toast.success({message: 'Forget password link is successfully send to your email'})
                    setTabPanel("mailSend")
                    },
                err => {
                    Toast.error({message: 'Email not exist!'})
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            Toast.error({message: 'Email not exist!'})
            console.error("Error occured on login page", err)
        }
    }


    // get All topic
    const getAllCategory = async () => {
        try {
        let { data } = await RestService.getAllCategory()
        setCategory(data)
        } catch (err) {
        console.error("error occur on getAllTopic()", err)
        }
    }

    useEffect(() => {
        getAllCategory()
    }, [])


    return (<div className="loginScreen">
            <div className="login-container">
                <div className="text-center mb-3">
                        {ICN_TRAINSOFT}
                </div>
                {tabPanel === "login" && <> <div className="text-center mb-3">Login to your Account</div>
                 <Formik
                    initialValues={{
                        "email": '',
                        "password": '',
                        "term":''
                    }}
                    // validationSchema={schema}
                    onSubmit={(values) => onLogin(values)}>
                    {({ handleSubmit }) => (<>
                        <form onSubmit={handleSubmit} className="login-form">
                            <TextInput name="email" label="User Name" />
                            <TextInput name="password" type="password" label="Password" />
                            <Checkbox className="mb-3 tnc-label" name="term" label="I accept the terms of service and privacy policy" id="term"/>
                            <div className="text-right">
                                <Button className="btn-am btn-block py-2" type="submit">Login</Button>
                               
                            </div>
                            <div className="text-right mt-2 f13 link" onClick={()=> setTabPanel("forget")}>
                              Forgot Password
                             </div>
                            <div className="text-center mt-3 f13">
                                Not registered? Contact us
                                </div>
                            <div>
                                {/* <button className="btn btn-primary btn-am btn-block" type="submit" onClick={()=> navigate('/dashboard',{ replace: true })}>Login</button> */}
                            </div>
                        </form>
                    </>)}
                </Formik></>
                }

              {tabPanel === "forget" && <> <div className="text-center mb-3">Forgot Password</div>
               <Formik
                    initialValues={{
                        "email": '',
                    }}
                    // validationSchema={schema}
                    onSubmit={(values) => forgetPwd(values)}>
                    {({ handleSubmit }) => (<>
                        <form onSubmit={handleSubmit} className="login-form">
                            <TextInput name="email" type="text" label="Email Id" />
                            <div className="text-right">
                                <Button className="btn-am btn-block py-2" type="submit">Submit</Button>
                            </div>
                            <div className="text-right mt-2 f13 link" onClick={()=>setTabPanel("login")}>
                               Login to your Account
                             </div>
                            <div className="text-center mt-3 f13">
                                Not registered? Contact us
                                </div>
                            <div>
                                {/* <button className="btn btn-primary btn-am btn-block" type="submit" onClick={()=> navigate('/dashboard',{ replace: true })}>Login</button> */}
                            </div>
                        </form>
                    </>)}
                </Formik>
                </>}
                {tabPanel === "mailSend" && <> 
                <Formik
                    initialValues={{
                        "email": '',
                    }}
                   >
                    {() => (<>
                        <form  className="login-form">
                        <div className="text-center mt-3 f13">
                                Successfully Mail Send to email
                            </div>
                            <div className="text-center mt-2 f13 link" onClick={()=>setTabPanel("login")}>
                               Login to your Account
                             </div>
                          
                            <div>
                                {/* <button className="btn btn-primary btn-am btn-block" type="submit" onClick={()=> navigate('/dashboard',{ replace: true })}>Login</button> */}
                            </div>
                        </form>
                    </>)}
                </Formik>
                </>
                }

            </div>
        
    </div>)
}

export default Login