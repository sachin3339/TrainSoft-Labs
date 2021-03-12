import React, { useContext } from 'react'

import { Formik } from 'formik';
import { Checkbox, TextInput } from '../../Common/InputField/InputField';
import { Button } from '../../Common/Buttons/Buttons';
import Screen from '../../../Assets/Images/screen.jpg'
import './auth.css'
import { navigate } from '../../Common/Router';
import AppContext from '../../../Store/AppContext';
import useToast from "../../../Store/ToastHook";


const user = [
    { name: 'Amit', role: 'admin', email: 'admin', password: '1234' },
    { name: 'Vikash', role: 'user', email: 'user', password: '1234' },
    { name: 'Rohit', role: 'trainer', email: 'trainer', password: '1234' }

]
const Login = () => {
    const {setValueBy} = useContext(AppContext)
    const Toast = useToast();
    
    // on login the user
    const onLogin = (value) => {
        try {
            let val = user.find(res => res.email === value.email)
            if (val.password === value.password) {
                setValueBy("LOGIN",val)
               val.role === "user" ?  navigate('/home', { state: { title: 'HOME'} }): navigate('/dashboard', { state: { title: 'DASHBOARD'} })
            } else {
                Toast.error({message: 'password is incorrect'})
            }
        } catch (err) {
            Toast.error({message: 'Wrong user name'})
            console.error("error occur on login page", err)
        }
    }

    return (<div className="loginScreen">
        <div className="loginLeftScreen col-4 ">
            <div className="ad-bg-color"></div>
        </div>
        <div className="loginRightScreen col-8">
            <div className="login-container">
                <div className="mb-3 text-center title-lg mb-5">Gey Started</div>
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
                            <TextInput name="password" label="Password" />
                            <Checkbox className="mb-3" name="term" label="I accept the terms of service and privacy policy" id="term"/>
                            <div className="text-right">
                                <Button className="btn-am btn-block py-2" type="submit">Login</Button>
                               
                            </div>
                            <div className="text-center mt-2">
                                Not registered? Contact us
                                </div>
                            <div>
                                {/* <button className="btn btn-primary btn-am btn-block" type="submit" onClick={()=> navigate('/dashboard',{ replace: true })}>Login</button> */}
                            </div>
                        </form>
                    </>)}

                </Formik>

            </div>
        </div>
    </div>)
}

export default Login