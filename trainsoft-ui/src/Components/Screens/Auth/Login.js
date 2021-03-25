import React, { useContext } from 'react'

import { Formik } from 'formik';
import { Checkbox, TextInput } from '../../Common/InputField/InputField';
import { Button } from '../../Common/Buttons/Buttons';
import Screen from '../../../Assets/Images/screen.jpg'
import './auth.css'
import { navigate } from '../../Common/Router';
import AppContext from '../../../Store/AppContext';
import useToast from "../../../Store/ToastHook";
import RestService from '../../../Services/api.service';
import AxiosService from '../../../Services/axios.service';
import { TokenService } from '../../../Services/storage.service';


const Login = () => {
    const {setValueBy,spinner,user} = useContext(AppContext)
    const Toast = useToast();
    
    // on login the user
    const onLogin = (value) => {
        try {
            RestService.login(value).then(
                response => {
                        let data = response.data
                        data.name = response.data.appuser.name
                        data.accessType = response.data.appuser.accessType
                        data.employeeId = response.data.appuser.accessType
                        setValueBy("LOGIN",data)
                        TokenService.saveToken(response.data.jwtToken)
                        data.role === "LEARNER" ?  navigate('/home', { state: { title: 'Home'} }): navigate('/dashboard', { state: { title: 'Dashboard'} })
                        
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

    return (<div className="loginScreen">
        
        
            <div className="login-container">
                <div className="text-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="134.792" height="22.372" viewBox="0 0 134.792 22.372">
                    <g id="Group_2" data-name="Group 2" transform="translate(-62.112 -45.964)">
                        <path id="Path_10" data-name="Path 10" d="M6.384-15.9H.112v-3.7h17.08v3.7H10.92V0H6.384Zm17.052,2.828a4.857,4.857,0,0,1,2.114-1.652,7.846,7.846,0,0,1,3.066-.56v4.032q-.728-.056-.98-.056a4,4,0,0,0-2.94,1.05,4.244,4.244,0,0,0-1.064,3.15V0H19.264V-15.064h4.172Zm14.056-2.212a7.84,7.84,0,0,1,5.376,1.666A6.375,6.375,0,0,1,44.744-8.6V0H40.656V-1.876q-1.232,2.1-4.592,2.1a7.127,7.127,0,0,1-3.01-.588,4.488,4.488,0,0,1-1.946-1.624,4.227,4.227,0,0,1-.672-2.352,3.925,3.925,0,0,1,1.582-3.3,8.062,8.062,0,0,1,4.886-1.2h3.472a2.784,2.784,0,0,0-.868-2.2,3.823,3.823,0,0,0-2.6-.77,7.6,7.6,0,0,0-2.366.378,6.26,6.26,0,0,0-1.974,1.022L31-13.468a9.461,9.461,0,0,1,2.954-1.344A13.233,13.233,0,0,1,37.492-15.288ZM37.156-2.716a3.8,3.8,0,0,0,1.988-.518A2.834,2.834,0,0,0,40.376-4.76V-6.3h-3q-2.688,0-2.688,1.764a1.571,1.571,0,0,0,.658,1.33A2.964,2.964,0,0,0,37.156-2.716ZM48.972-15.064H53.34V0H48.972Zm2.184-2.1a2.77,2.77,0,0,1-1.96-.7A2.27,2.27,0,0,1,48.44-19.6a2.27,2.27,0,0,1,.756-1.736,2.77,2.77,0,0,1,1.96-.7,2.84,2.84,0,0,1,1.96.672,2.155,2.155,0,0,1,.756,1.68,2.378,2.378,0,0,1-.756,1.806A2.738,2.738,0,0,1,51.156-17.164Zm15.68,1.876a6.2,6.2,0,0,1,4.522,1.68A6.662,6.662,0,0,1,73.08-8.624V0H68.712V-7.952a3.927,3.927,0,0,0-.784-2.674,2.875,2.875,0,0,0-2.268-.882,3.476,3.476,0,0,0-2.632,1.022,4.232,4.232,0,0,0-.98,3.038V0H57.68V-15.064h4.172V-13.3a5.793,5.793,0,0,1,2.156-1.47A7.512,7.512,0,0,1,66.836-15.288ZM84.056.336a16.037,16.037,0,0,1-4.494-.63,10.54,10.54,0,0,1-3.486-1.638l1.54-3.416a10.45,10.45,0,0,0,3,1.484,11.253,11.253,0,0,0,3.472.56,5.547,5.547,0,0,0,2.856-.574A1.734,1.734,0,0,0,87.864-5.4a1.459,1.459,0,0,0-.546-1.162,4.139,4.139,0,0,0-1.4-.742q-.854-.28-2.31-.616A31.932,31.932,0,0,1,79.94-8.988,5.959,5.959,0,0,1,77.49-10.7a4.613,4.613,0,0,1-1.022-3.136,5.455,5.455,0,0,1,.924-3.094,6.216,6.216,0,0,1,2.786-2.2,11.368,11.368,0,0,1,4.55-.812,15.066,15.066,0,0,1,3.668.448A10.836,10.836,0,0,1,91.532-18.2l-1.4,3.444A10.929,10.929,0,0,0,84.7-16.3a5.093,5.093,0,0,0-2.814.616,1.88,1.88,0,0,0-.91,1.624,1.588,1.588,0,0,0,1.05,1.5,16.485,16.485,0,0,0,3.206.966A31.933,31.933,0,0,1,88.9-10.528a6.074,6.074,0,0,1,2.45,1.68A4.5,4.5,0,0,1,92.372-5.74a5.352,5.352,0,0,1-.938,3.066,6.3,6.3,0,0,1-2.814,2.2A11.472,11.472,0,0,1,84.056.336ZM102.62.224A9.033,9.033,0,0,1,98.35-.77,7.389,7.389,0,0,1,95.4-3.528a7.6,7.6,0,0,1-1.064-4,7.6,7.6,0,0,1,1.064-4,7.389,7.389,0,0,1,2.954-2.758,9.033,9.033,0,0,1,4.27-.994,8.95,8.95,0,0,1,4.256.994,7.412,7.412,0,0,1,2.94,2.758,7.6,7.6,0,0,1,1.064,4,7.6,7.6,0,0,1-1.064,4,7.412,7.412,0,0,1-2.94,2.758A8.95,8.95,0,0,1,102.62.224Zm0-3.584a3.638,3.638,0,0,0,2.758-1.134,4.227,4.227,0,0,0,1.078-3.038,4.227,4.227,0,0,0-1.078-3.038A3.638,3.638,0,0,0,102.62-11.7a3.683,3.683,0,0,0-2.772,1.134,4.2,4.2,0,0,0-1.092,3.038,4.2,4.2,0,0,0,1.092,3.038A3.683,3.683,0,0,0,102.62-3.36Zm16.24-11.368h3.864v3.36h-3.752V0H114.6V-11.368H112.28v-3.36H114.6V-15.4a5.5,5.5,0,0,1,1.526-4.088,5.843,5.843,0,0,1,4.3-1.512,8.017,8.017,0,0,1,1.862.21,4.525,4.525,0,0,1,1.47.6l-1.148,3.164a2.987,2.987,0,0,0-1.764-.532q-1.988,0-1.988,2.184Zm16.044,14a4.49,4.49,0,0,1-1.582.714,8,8,0,0,1-1.974.238,5.865,5.865,0,0,1-4.158-1.372,5.25,5.25,0,0,1-1.47-4.032v-6.188H123.4v-3.36h2.324V-18.4h4.368v3.668h3.752v3.36h-3.752v6.132a2.056,2.056,0,0,0,.49,1.47,1.816,1.816,0,0,0,1.386.518,2.807,2.807,0,0,0,1.764-.56Z" transform="translate(62 68)" fill="#2d62ed"/>
                    </g>
                    </svg>
                </div>
                <div className="text-center mb-3">Login to your Account</div>
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
                            <div className="text-center mt-3 f13">
                                Not registered? Contact us
                                </div>
                            <div>
                                {/* <button className="btn btn-primary btn-am btn-block" type="submit" onClick={()=> navigate('/dashboard',{ replace: true })}>Login</button> */}
                            </div>
                        </form>
                    </>)}

                </Formik>

            </div>
        
    </div>)
}

export default Login