import { Dialog, IconButton } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { ICN_TRAINSOFT } from "../../Common/Icon";
import { Formik, yupToFormErrors, ErrorMessage } from "formik";
import { Form } from "react-bootstrap";
import {
  RadioBox,
  SelectInput,
  TextInput,
} from "../../Common/InputField/InputField";
import { BtnInfo } from "../../Common/Buttons/Buttons";
import { AssesmentContext } from "./AssesementContext";
import { navigate } from "../../Common/Router";
import APILINKS from '../../../Constant/GlobleConstant';
import * as Yup from 'yup';
import axios from "axios";
import { Category } from "@material-ui/icons";

export const AssesmnetDialog = () => {
  const { dialogOpen: open, setDialogOpen: setOpen } = useContext(
    AssesmentContext
  );

  const [category, setCategory] = useState([])
  const [topics, setTopics] = useState([])

  useEffect(() => {
    const APIGETLINK = "https://www.trainsoft.io/assessnet/v1/categories";
    axios.get(APIGETLINK).then((res) => {
      setCategory(res.data);

    })
  }, [])

  useEffect(() =>{
    const TOPICLINK = "https://www.trainsoft.io/assessnet/v1/display/topics";
    axios.get(TOPICLINK).then((response) => {
      setTopics(response.data);
    })
  }
  )

  //Assesment API
  const APILINK = APILINKS.ASSESMENT.CREATE_E_ASSESMENT;

  const [state, setState] = useState({
    "appuser": {
      "emailId": "",
      "name": ""
    },
    "categoryTopicValue": { category: "", topic: "", difficulty: "" },
    "companySid": null,
    "departmentVA": {
      "departmentRole": "ASSESS_USER"
    },
    "role": "USER"
  });

  const onSubmitted = async (values, { setSubmitting }) => {
    try {
      // --------we need remarks and user id as a payload so we are using session storage-----//
      let tempData = { ...values, categoryTopicValue: JSON.stringify(values.categoryTopicValue) };
      await axios.post(APILINK, tempData);
      setOpen(false)
      setSubmitting(false);
    } catch (err) {
      setSubmitting(false)
    }
  }

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => {
        setOpen(false);
        // setSubmited(false);
      }}
    >
      <div className="jcb">
        <div></div>
        <div>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              // setOpen(false);
              navigate("/");
              // setSubmited(false);
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <div className="container-fluid row jcc dialog-pg">
        <div className="col-6">
          <div className="text-center mb-4">{ICN_TRAINSOFT}</div>
          <div className="pg-title2 text-center mb-2">
            Thank you for your interest in our e-Assessment tool
          </div>
          <div className="text-center">
            Take our FREE sample assessment to get the experience of our tool
          </div>
          <div className="context-body">
            {true ? (
              <Formik
                initialValues={state}

                validationSchema={Yup.object().shape({
                  appuser: Yup.object().shape({
                    name: Yup.string().required("Enter your name"),
                    emailId: Yup.string().required("Enter your EMail Id"),
                  }),
                  categoryTopicValue: Yup.object().shape({
                    category: Yup.string().required("Choose a Category"),
                    difficulty: Yup.string().required("Choose a Difficulty"),
                    topic: Yup.string().required("Chose a Topic"),
                  }),

                })

                }
                onSubmit={onSubmitted}
              >
                {({ handleSubmit,values, errors, touched, isSubmitting, isValid, dirty, setFieldValue }) => (
                  <form onSubmit={handleSubmit} className="create-batch">
                    <div>
                      <Form.Group>
                        <TextInput
                          label="Enter your name"
                          placeholder="Name"
                          name="appuser.name"
                        />
                      </Form.Group>
                      {errors.name && touched.name && (<div>{errors.name}</div>)}
                      <Form.Group>
                        <TextInput
                          label="Your Email"
                          placeholder="Email"
                          name="appuser.emailId"
                        />
                        {errors.emailId && touched.emailId && (<div>{errors.emailId}</div>)}
                      </Form.Group>
                      
      
                      <Form.Group>
                      <SelectInput label="Select Category" name="categoryTopicValue.category" bindKey="name" option={category} valueKey="name" />
                         </Form.Group>
                        
                      <Form.Group>
                        <Form.Label className="label">
                          Select Difficulty
                        </Form.Label>
                        <div>
                          <RadioBox name="categoryTopicValue.difficulty" options={["Beginner", "Intermediate", "Expert"]} />
                        </div>
                        {errors.difficulty && touched.difficulty && (<div>{errors.difficulty}</div>)}
                      </Form.Group>
                     {/*<Form.Group>
                      <SelectInput label="Select Topic" name="categoryTopicValue.topic" value={topics.name} bindKey="name" option={topics} />
                     </Form.Group> */}
                      <Form.Group>
                        <SelectInput
                          label="Select Topic"
                          option={["Java", "Not Java"]}
                          name="categoryTopicValue.topic"
                        />
                        {errors.topic && touched.topic && (<div>{errors.topic}</div>)}
                     </Form.Group>
                    </div>
                    <footer className="mt-4">
                      <div> </div>
                      <div>
                        <BtnInfo
                          type="submit"
                          className="btn-block btn-block"
                          //onClick={() => setOpen(false)}
                          disabled={isSubmitting || !isValid || !dirty}
                        >
                          LET’S BEGIN! IT’S FREE
                        </BtnInfo>
                      </div>
                    </footer>
                  </form>
                )}
              </Formik>
            ) : (
              <div>
                <div className="text-center title-ss text-success">
                  {/* Hi, {contact.name} Our sales team will get back to you ASAP */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};
