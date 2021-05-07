import { Dialog, IconButton } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { ICN_TRAINSOFT } from "../../Common/Icon";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import {
  RadioBoxKey,
  SelectInput,
  TextInput,
} from "../../Common/InputField/InputField";
import { BtnInfo } from "../../Common/Buttons/Buttons";
import { AssessmentContext } from "./AssesementContext";
import { navigate } from "../../Common/Router";
import * as Yup from 'yup';
import RestService from "../../../Services/api.service";
import GLOBELCONSTANT from "../../../Constant/GlobleConstant";
import AppContext from "../../../Store/AppContext";
import AppUtils from "../../../Services/Utils";
import useToast from "../../../Store/ToastHook";
import { useParams } from "@reach/router";

const SCHEMA = Yup.object().shape({
  appuser: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    emailId: Yup.string().email("Please enter valid email").required("Email id is required"),
    phoneNumber: Yup.string().required("Mobile number is required"),
  }),
  categoryTopicValue: Yup.object().shape({
    // category: Yup.string().required("Choose a Category"),
    topic: Yup.string().required("Please select topic"),
  }),
})

export const AssessmentDialog = () => {
  const params = useParams();
  const {
    dialogOpen: open,
    setDialogOpen: setOpen,
    setInstruction,
    setAssUserInfo
  } = useContext(AssessmentContext);
  const Toast = useToast();
  const { spinner } = useContext(AppContext)
  const [category, setCategory] = useState([]);
  const [userInfo, setUserInfo] = useState(GLOBELCONSTANT.DATA.CREATE_ASS_USER);

  // create user
  const createAssUser = async (values, assessmentSid) => {
    try {
      spinner.show("Loading... Please wait...");
      let payload = { ...values };
      // payload.categoryTopicValue.category = payload.categoryTopicValue.category.name;
      payload.categoryTopicValue = JSON.stringify(values.categoryTopicValue);
      values.companySid = JSON.parse(params.companySid)? params.companySid : null;
      let header = {
        "assessSid": assessmentSid
      }
      RestService.createAssessmentUser(payload, header).then(
        response => {
          spinner.hide();
          setAssUserInfo(response.data);
          setOpen(false);
        },
        err => {
          spinner.hide();
        }
      ).finally(() => {
        spinner.hide();
      });
    } catch (err) {
      spinner.hide();
      console.error("error occur on createAssUser()--", err);
    }
  }

  // get assessment instruction
  const getAssessmentInstruction = async (values) => {
    try {
      spinner.show();
      let payload = {
        "companySid": JSON.parse(params.companySid)? params.companySid : null,
        "difficulty": values.categoryTopicValue.difficulty,
        "tagSid": values.categoryTopicValue.topic
      }
      RestService.getAssessmentInstruction(payload).then(
        response => {
          if(response.status === 204) Toast.error({ message: `Sorry! there are no set available for ${values.categoryTopicValue.difficulty.toLowerCase()}. Please try later.` });
          createAssUser(values, response.data?.sid);
          setInstruction(response.data);
        },
        err => {
          spinner.hide();
        }
      ).finally(() => {
        spinner.hide();
      });
    } catch (err) {
      spinner.hide();
      console.error("error occur on getAssessmentInstruction()--", err);
    }
  }

  // get all category
  const getAllCategory = async () => {
    try {
      spinner.show("Loading... Please wait...");
      RestService.getAllCategory().then(
        response => {
          spinner.hide();
          setCategory(response.data);
        },
        err => {
          spinner.hide();
        }
      ).finally(() => {
        spinner.hide();
      });
    } catch (err) {
      spinner.hide();
      console.error("error occur on getAllCategory()--", err);
    }
  }

  // get all category
  const getAssessmentBySid = async (sid) => {
    try {
      spinner.show("Loading... Please wait...");
      RestService.getAssessmentBySid().then(
        response => {
          spinner.hide();
          setInstruction(response.data);
        },
        err => {
          spinner.hide();
        }
      ).finally(() => {
        spinner.hide();
      });
    } catch (err) {
      spinner.hide();
      console.error("error occur on getAssessmentBySid()--", err);
    }
  }

  // listening for params value
  useEffect(() => {
    if(AppUtils.isNotEmptyObject(params)) {
      console.log(params);
      if(JSON.parse(params.assessmentSid)) getAssessmentBySid(params.assessmentSid);
    } 
  }, [params]);

  // initialize component
  useEffect(() => {
    getAllCategory();
  }, [])

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
                initialValues={userInfo}
                validationSchema={SCHEMA}
                onSubmit={(values) => JSON.parse(params.assessmentSid) ? createAssUser(values, params.assessmentSid) : getAssessmentInstruction(values)}
              >
                {({ handleSubmit, values, errors, touched, isSubmitting, isValid, dirty, setFieldValue }) => (
                  <form onSubmit={handleSubmit} className="create-batch">
                    <div>
                      <Form.Group>
                        <TextInput
                          label="Enter your name"
                          placeholder="Name"
                          name="appuser.name"
                        />
                      </Form.Group>
                      
                      <Form.Group>
                        <TextInput
                          label="Your Email"
                          placeholder="Email"
                          name="appuser.emailId"
                        />
                       
                      </Form.Group>
                      <Form.Group>
                        <TextInput
                          label="Mobile Number"
                          placeholder="Mobile Number"
                          name="appuser.phoneNumber"
                        />
                      </Form.Group>


                      <Form.Group>
                        <SelectInput 
                          label="Select Category" 
                          name="categoryTopicValue.category" 
                          bindKey="name" 
                          option={category} 
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label className="label">
                          Select Difficulty
                          </Form.Label>
                        <div style={{ marginBottom: "10px" }}>
                          <RadioBoxKey name="categoryTopicValue.difficulty" options={GLOBELCONSTANT.DIFFICULTY} />
                        </div>
                      </Form.Group>
                      <Form.Group>
                        <SelectInput
                          label="Select Topic"
                          option={values.categoryTopicValue?.category?.tags}
                          name="categoryTopicValue.topic"
                          bindKey="name"
                          valueKey="sid"
                        />
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