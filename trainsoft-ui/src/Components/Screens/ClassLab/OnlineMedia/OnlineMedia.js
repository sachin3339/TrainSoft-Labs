import { useState,useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import ReactPlayer from 'react-player/lazy'
import { Button } from '../../../Common/Buttons/Buttons'
import { ICN_PLAY } from '../../../Common/Icon';
const OnlineMedia = ({clickByMenu = false}) => {
    const [mediaLink, setMediaLink] = useState(null)

    useEffect(() => {
        clickByMenu && setMediaLink(null)
    }, [clickByMenu])

    return (<div className="media-link">
        {mediaLink && <ReactPlayer
        width='100%'
        height='100%'
        url={mediaLink} controls={true}/>}

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

    </div>)
}
export default OnlineMedia