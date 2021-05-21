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
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


const USER_SCHEMA = Yup.object().shape({
  appuser: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    emailId: Yup.string().email("Please enter valid email").required("Email id is required"),
    phoneNumber: Yup.string().required("Mobile number is required").matches(phoneRegExp,"Mobile number is not valid"),
  }),
  categoryTopicValue: Yup.object().shape({
    category: Yup.object().nullable().required("Category is required"),
    topic: Yup.string().required("Please select topic"),
  }),
})

const ASSESSMENT_SCHEMA = Yup.object().shape({
  appuser: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    emailId: Yup.string().email("Please enter valid email").required("Email id is required"),
    phoneNumber: Yup.string().required("Mobile number is required").matches(phoneRegExp,"Mobile number is not valid"),
  })
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
      payload.categoryTopicValue = JSON.stringify(values.categoryTopicValue);
      values.companySid = params.companySid != 0 ? params.companySid : null;
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
        // spinner.hide();
      });
    } catch (err) {
      spinner.hide();
      console.error("error occur on createAssUser()--", err);
    }
  }

  // get assessment instruction
  const getAssessmentInstruction = async (values) => {
    try {
      spinner.show("Loading... Please wait...");
      let payload = {
        "companySid": params.companySid == 0 ? null : params.companySid,
        "difficulty": values.categoryTopicValue.difficulty,
        "tagSid": values.categoryTopicValue.topic
      }
      RestService.getAssessmentInstruction(payload).then(
        response => {
          if(response.status === 204) Toast.error({ message: `Sorry! there are no set available for ${values.categoryTopicValue.difficulty.toLowerCase()}. Please try later.`, time: 3000 });
          createAssUser(values, response.data?.sid);
          setInstruction(response.data);
        },
        err => {
          spinner.hide();
        }
      ).finally(() => {
        // spinner.hide();
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

  // get assessment by assessment sid
  const getAssessmentBySid = async (values, sid) => {
    try {
      spinner.show("Loading... Please wait...");
      RestService.getAssessmentBySid(sid).then(
        response => {
          setInstruction(response.data);
          params?.virtualAccountSid == 0 
          ? createAssUser(values, params.assessmentSid) 
          : getUserByVirtualAccountSid(params?.virtualAccountSid);
        },
        err => {
          console.error(err)
          spinner.hide();
        }
      ).finally(() => {
        // spinner.hide();
      });
    } catch (err) {
      spinner.hide();
      console.error("error occur on getAssessmentBySid()--", err)
    }
  }

  // get user by virtual account sid
  const getUserByVirtualAccountSid = async (sid) => {
    try {
      spinner.show("Loading... Please wait...");
      RestService.getAssUserByVirtualAccountSid(sid).then(
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
      console.error("error occur on getUserByVirtualAccountSid()--", err);
    }
  }

  // handleSubmit
  const handleSubmit1 = (values) => {
    try {
      if(params.assessmentSid == 0) {
        getAssessmentInstruction(values);
      } else {
        getAssessmentBySid(values, params?.assessmentSid);
      }
    } catch (err) {
      console.log("Error occur in handleSubmit --- ", err);
    }
  }
  
  // listening for params value
  useEffect(() => {
    if(AppUtils.isNotEmptyObject(params)) {
      if(params?.virtualAccountSid != 0) {
        getAssessmentBySid("", params?.assessmentSid);
      }
    } 
  }, []);

  /**
   * initialize component when page reloaded through url
   * url contains assessment sid / companySid / virtual account sid
   * "/assessment/:assessmentSid/:companySid/:virtualAccountSid"
   *  */ 
  useEffect(() => {
    getAllCategory();
    params?.virtualAccountSid !=0 && setOpen(false)
  }, [])

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <div className="jcb">
        <div></div>
        <div>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate("/")}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <div className="container-fluid row jcc dialog-pg">
        <div className="col-6 pb20 mb20">
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
                validationSchema={params?.assessmentSid != 0 ? ASSESSMENT_SCHEMA : USER_SCHEMA}
                onSubmit={handleSubmit1}
              >
                {({ handleSubmit, values, touched, isSubmitting, dirty }) => (
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
                      {
                        params.assessmentSid == 0
                        && <>
                            <SelectInput 
                              label="Select Category" 
                              name="categoryTopicValue.category" 
                              bindKey="name" 
                              option={category} 
                            />
                            <SelectInput
                              label="Select Topic"
                              option={values.categoryTopicValue?.category?.tags}
                              name="categoryTopicValue.topic"
                              bindKey="name"
                              valueKey="sid"
                            />
                          <Form.Group>
                            <Form.Label className="label">
                              Select Difficulty
                              </Form.Label>
                            <div style={{ marginBottom: "10px" }}>
                              <RadioBoxKey name="categoryTopicValue.difficulty" options={GLOBELCONSTANT.DIFFICULTY} />
                            </div>
                          </Form.Group>
                        </>
                      }
                    </div>
                    <footer className="mt-4">
                      <div> </div>
                      <div>
                        <BtnInfo type="submit" className={`btn-block btn-block`} disabled={isSubmitting || !dirty || !touched}>
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
