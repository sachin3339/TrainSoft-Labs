import { Form } from 'react-bootstrap'
import { navigate } from "@reach/router";

import './auth.css'

const Login = () => {
    return (<div className="loginScreen">
            <div className="loginLeftScreen col-6">

            </div>
        <div className="loginRightScreen col-6">
            <div className="login-container">
                <div className="mb-3 text-center">Gey Started</div>
                <Form.Group>
                    <Form.Control type="text" placeholder="Username" />
                    <br />
                    <Form.Control type="password" placeholder="password" />
                </Form.Group>
                <div>
                    <button className="btn btn-primary btn-am btn-block" type="submit" onClick={()=> navigate('/dashboard',{ replace: true })}>Login</button>
                </div>
            </div>
        </div>
    </div>)
}

export default Login