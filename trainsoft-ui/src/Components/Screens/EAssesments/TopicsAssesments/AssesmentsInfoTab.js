import {useContext } from 'react'
import { Form } from "react-bootstrap";
import AssessmentContext from "../../../../Store/AssessmentContext";
import moment from 'moment'


const AssesmentInfoTab = () => {
  const {topicSid,initialAssessment} = useContext(AssessmentContext)

  return (
    <>
      <div
        className="table-shadow"
        style={{ padding: "20px", marginTop: "20px" }}
      >
        <Form.Group>
          <diV style={{ fontWeight: 600, fontSize: "18px" }}>
            Assesment Info
          </diV>
        </Form.Group>

        <Form.Group>
          <Form.Label>Assesment Title</Form.Label>
          <br />
          <Form.Label style={{ fontWeight: 600 }}>{initialAssessment?.title}</Form.Label>
        </Form.Group>

        <Form.Group>
          <Form.Label>Type</Form.Label>
          <br />
          <Form.Label style={{ fontWeight: 600 }}>{initialAssessment?.premium ? "Premium" : "Free"}</Form.Label>
        </Form.Group>

        <Form.Group>
          <Form.Label>Category</Form.Label>
          <br />
          <Form.Label style={{ fontWeight: 600 }}>Technology</Form.Label>
        </Form.Group>

        <Form.Group>
          <Form.Label>Difficulty</Form.Label>
          <br />
          <Form.Label style={{ fontWeight: 600 }}>{initialAssessment?.difficulty}</Form.Label>
        </Form.Group>
      </div>
      <div
        className="table-shadow"
        style={{ padding: "20px", marginTop: "20px" }}
      >
        <Form.Group>
          <diV style={{ fontWeight: 600, fontSize: "18px" }}>
            Assesment Rules
          </diV>
        </Form.Group>

        <Form.Group>
          <Form.Label>Time Limit</Form.Label>
          <br />
          <Form.Label style={{ fontWeight: 600 }}>{initialAssessment?.validUpto === 0 ? "No Limit": moment(initialAssessment?.validUpto).format("DD/MM/YYYY") }</Form.Label>
        </Form.Group>

        <Form.Group>
          <Form.Label>Assessment Sitting</Form.Label>
          <br />
          <Form.Label style={{ fontWeight: 600 }}>{initialAssessment?.multipleSitting ? "Multiple" : "Signal"}</Form.Label>
        </Form.Group>

        <Form.Group>
          <Form.Label>All Question Mandatory</Form.Label>
          <br />
          <Form.Label style={{ fontWeight: 600 }}>{initialAssessment?.mandatory ? "Multiple" : "Signal"}</Form.Label>
        </Form.Group>
      </div>
    </>
  );
};

export default AssesmentInfoTab