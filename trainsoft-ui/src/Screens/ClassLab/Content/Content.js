import { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import ReactPlayer from 'react-player/lazy'
import { Button } from '../../../Components/Buttons/Buttons'
import { ICN_PLAY, ICN_PRESENT } from '../../../Constant/Icon';
const Content = () => {
    const [content, setContent] = useState(null)
    const [file, setFile] = useState("");

    const handleUpload =(event) => {
        setFile(event.target.files[0]);
      }

      /**
         * Component to display thumbnail of image.
         */
        const ImageView = ({ image }) => {
            return <div className="img-view"><img src={URL.createObjectURL(image)} alt={image.name} /></div>;
        };

    return (<div className="media-link">
        {console.log(file)}
        {content && <ImageView image={content}/>}

        {!content && <div>
            <Formik
                initialValues={{ "content": content }}
                onSubmit={(values) => setContent(values.content)}>
                {() => (
                    <Form>
                        <div className="chat-send">
                            <div className="full-w">
                            <label for="file-upload" class="custom-file-upload">
                                Browse file
                            </label>
                               {/* <input id="file-upload" type="file"/> */}
                                <Field  id="file-upload" type="file" onChange={handleUpload} className="form-control" name="content" placeholder="Type your message..." />
                            </div>
                        </div>
                        <div>
                            <Button type="button" onClick={()=> setContent(file)} className="px-5"><span className="w-20">{ICN_PRESENT}</span> Present</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>}

    </div>)
}
export default Content