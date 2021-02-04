import { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import ReactPlayer from 'react-player/lazy'
import { Button } from '../../../Components/Buttons/Buttons'
import { ICN_PLAY } from '../../../Constant/Icon';
const OnlineMedia = () => {
    const [mediaLink, setMediaLink] = useState(null)
    return (<div className="media-link">
        {mediaLink && <ReactPlayer url={mediaLink} controls={true}/>}

        {!mediaLink && <div>
            <Formik
                initialValues={{ "mediaLink": mediaLink }}
                onSubmit={(values) => setMediaLink(values.mediaLink)}>
                {() => (
                    <Form>
                        <div className="chat-send">
                            <div>
                                <Field type="text" className="form-control" name="mediaLink" placeholder="Type your message..." />
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