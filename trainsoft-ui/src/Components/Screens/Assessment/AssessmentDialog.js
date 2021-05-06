import { Dialog, IconButton } from "@material-ui/core";
import { useContext } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { ICN_TRAINSOFT } from "../../Common/Icon";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import {
  RadioBox,
  SelectInput,
  TextInput,
} from "../../Common/InputField/InputField";
import { BtnInfo } from "../../Common/Buttons/Buttons";
import { AssessmentContext } from "./AssesementContext";
import { navigate } from "../../Common/Router";

export const AssessmentDialog = () => {
  const { dialogOpen: open, setDialogOpen: setOpen } = useContext(
    AssessmentContext
  );

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
                // onSubmit={(value) => onSubmit(value)}
                initialValues={{
                  name: "",
                  phoneNo: "",
                  email: "",
                }}
                // validationSchema={schema}
              >
                {({ handleSubmit, isSubmitting, dirty, setFieldValue }) => (
                  <form onSubmit={handleSubmit} className="create-batch">
                    <div>
                      <Form.Group>
                        <TextInput
                          label="Enter your name"
                          placeholder="Name"
                          name="name"
                        />
                      </Form.Group>
                      <Form.Group>
                        <TextInput
                          label="Your Email"
                          placeholder="Email"
                          name="email"
                        />
                      </Form.Group>
                      <Form.Group>
                        <SelectInput
                          label="Select Category"
                          option={["Technology", "Technology"]}
                          name="trainingBatchs"
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="label">
                          Select Difficulty
                        </Form.Label>
                        <div>
                          <RadioBox name="hi" options={["Java", "Not Java"]} />
                        </div>
                      </Form.Group>
                      <Form.Group>
                        <SelectInput
                          label="Select Topic"
                          option={["Java", "Not Java"]}
                          name="trainingBatchs"
                        />
                      </Form.Group>
                    </div>
                    <footer className="mt-4">
                      <div> </div>
                      <div>
                        <BtnInfo
                          type="submit"
                          className="btn-block btn-block"
                          onClick={() => setOpen(false)}
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
