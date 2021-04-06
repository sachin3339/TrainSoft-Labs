import React, { useContext, useState, useEffect } from 'react'
import { Formik } from 'formik';
import { TextInput } from '../../Common/InputField/InputField';
import { Button } from '../../Common/Buttons/Buttons';
import Header from '../../LandingPage/Layout/Header';
import useToast from "../../../Store/ToastHook";
import AppContext from '../../../Store/AppContext';
import RestService from '../../../Services/api.service';
import { navigate } from '../../Common/Router';
import * as Yup from 'yup';
import './auth.css'


const ResetPwd = ({ token }) => {
    const { spinner } = useContext(AppContext)
    const [userData, setUserData] = useState(null)
    const Toast = useToast();

    // validation
    const schema = Yup.object().shape({
        password: Yup.string()
            .required('Please Enter your password'),
        conformPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required("Required!"),
    });

    // validate token
    const validateToken = () => {
        try {
            RestService.validateToken(token).then(
                response => {
                    setUserData(response.data)
                },
                err => {
                    Toast.error({ message: 'Invalid User Name / Password!' })
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            Toast.error({ message: 'Invalid User Name / Password!' })
            console.error("Error occured on login page", err)
        }
    }

    // update password
    const updatePwd = (value) => {
        try {
            spinner.show();
            RestService.updatePwd(token, userData.sid, value.password).then(
                response => {
                    spinner.hide();
                    Toast.success({ message: 'Password is successfully changed.' })
                    navigate('/login')
                },
                err => {
                    Toast.error({ message: 'Invalid User Name / Password!' })
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            Toast.error({ message: 'Invalid User Name / Password!' })
            console.error("Error occured on login page", err)
        }
    }

    // initialize component
    useEffect(() => {
        token && validateToken()
    }, [token])

    return <>
        <Header {...{ reset: true }} />
        <div className="mt-5 px-4">
            <div className="row jcc">
                <div className="col-md-4">
                    <div className="text-center mb-3">Reset your password</div>
                    <Formik
                        initialValues={{
                            "password": '',
                            "conformPassword": '',
                        }}
                        validationSchema={schema}
                        onSubmit={(values) => updatePwd(values)}>
                        {({ handleSubmit }) => (<>
                            <form onSubmit={handleSubmit} className="login-form">
                                <TextInput name="password" label="Password" type="password" />
                                <TextInput name="conformPassword" type="password" label="Confirm Password" />
                                {/* <Checkbox className="mb-3 tnc-label" name="term" label="I accept the terms of service and privacy policy" id="term"/> */}
                                <div className="text-right">
                                    <Button className="btn-am btn-block py-2" type="submit">Submit</Button>
                                </div>
                                <div>
                                    {/* <button className="btn btn-primary btn-am btn-block" type="submit" onClick={()=> navigate('/dashboard',{ replace: true })}>Login</button> */}
                                </div>
                            </form>
                        </>)}
                    </Formik>
                </div>
            </div>
        </div>
    </>
}
export default ResetPwd