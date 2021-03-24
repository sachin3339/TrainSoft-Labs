import React, { useState } from 'react';
const useSpinner = () => {
    const [spinner, setSpinner] = useState(false)
    const [message, setMessage] = useState()
    const show = (mes = 'Loading Please..Wait') => { setMessage(mes) ; setSpinner(true) }
    const hide = () => setSpinner(false)
    return { show, hide, spinner, message }
}
export default useSpinner;