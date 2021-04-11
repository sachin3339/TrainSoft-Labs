import { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { Button } from '../../../Common/Buttons/Buttons'
import { ICN_PLAY, ICN_PRESENT } from '../../../Common/Icon';
import { AttachmentViewer } from 'dev-react-attachment-viewer';

const Content = () => {
    const [content, setContent] = useState(null)
    const [file, setFile] = useState("");

    const handleUpload = (event) => {
        setFile(event.target.files[0]);
    }
 

    /**
       * Component to display thumbnail of image.
       */
    const ImageView = ({ image }) => {
        return <div className="img-view"> <AttachmentViewer
            {...{
                path: URL.createObjectURL(image),
                type: image.name.split('.')[1],
                onDblClick: () => { },
            }}
        /></div>;
    };

    return (<div className="media-link">
        {content && <ImageView image={content} />}


        {!content && <div>
            <Formik
                initialValues={{ "content": content }}
                onSubmit={(values) => setContent(values.content)}>
                {() => (
                    <Form>
                        <div className="chat-send">
                            <div className="full-w">
                                <label for="file-upload" className="custom-file-upload">
                                    <div className="elps">{file && file.name}</div> <div className="elps">Browse file</div>
                                </label>
                                {/* <input id="file-upload" type="file"/> */}
                                <Field id="file-upload" type="file" onChange={handleUpload} className="form-control" name="content" placeholder="Type your message..." />
                            </div>
                        </div>
                        <div>
                            <Button type="button" onClick={() => setContent(file)} className="px-5"><span className="w-20">{ICN_PRESENT}</span> Present</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>}

    </div>)
}
export default Content