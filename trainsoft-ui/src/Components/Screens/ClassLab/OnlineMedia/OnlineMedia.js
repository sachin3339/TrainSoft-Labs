import { useState, useEffect, useContext } from 'react';
import { Formik, Field, Form } from 'formik';
import ReactPlayer from 'react-player/lazy'
import { Button,BtnSquare } from '../../../Common/Buttons/Buttons'
import { ICN_NAV_BEFORE, ICN_NAV_NEXT, ICN_PLAY } from '../../../Common/Icon';
import AppContext from '../../../../Store/AppContext';
const OnlineMedia = () => {
    const { user, spinner, ROLE } = useContext(AppContext)
    const [mediaLink, setMediaLink] = useState("https://youtu.be/xk4_1vDrzzo")



    return (
        <div className="full-h column">
            <div className="jce py-2 px-2">
                <div className="disable flx">
                <BtnSquare>{ICN_NAV_BEFORE}</BtnSquare>
                <BtnSquare className="mx-3"> {ICN_PLAY}</BtnSquare>
                 <BtnSquare>{ICN_NAV_NEXT}</BtnSquare>
                </div>
            </div>
    <div className="media-link">
        {mediaLink && <ReactPlayer
            width='100%'
            height='100%'
            url={mediaLink} controls={true} />}

        {!mediaLink && <div>
            <Formik
                initialValues={{ "mediaLink": mediaLink }}
                onSubmit={(values) => setMediaLink(values.mediaLink)}>
                {() => (
                    <Form>
                        <div className="chat-send">
                            <div className="full-w">
                                <Field type="text" className="form-control" name="mediaLink" placeholder="Past your media link here..." />
                            </div>
                        </div>
                        <div>
                            <Button type="submit" className="px-5"><span className="w-20">{ICN_PLAY}</span> Play</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>}

    </div></div>)
}
export default OnlineMedia