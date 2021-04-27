import { Form } from "react-bootstrap";

const AssesmentInfoTab = () => {
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
          <Form.Label style={{ fontWeight: 600 }}>JAVA Fundamentals</Form.Label>
        </Form.Group>

        <Form.Group>
          <Form.Label>Type</Form.Label>
          <br />
          <Form.Label style={{ fontWeight: 600 }}>Premium</Form.Label>
        </Form.Group>

        <Form.Group>
          <Form.Label>Category</Form.Label>
          <br />
          <Form.Label style={{ fontWeight: 600 }}>Technology</Form.Label>
        </Form.Group>

        <Form.Group>
          <Form.Label>Difficulty</Form.Label>
          <br />
          <Form.Label style={{ fontWeight: 600 }}>Beginner</Form.Label>
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
          <Form.Label>Assesment Title</Form.Label>
          <br />
          <Form.Label style={{ fontWeight: 600 }}>JAVA Fundamentals</Form.Label>
        </Form.Group>

        <Form.Group>
          <Form.Label>Type</Form.Label>
          <br />
          <Form.Label style={{ fontWeight: 600 }}>Premium</Form.Label>
        </Form.Group>

        <Form.Group>
          <Form.Label>Category</Form.Label>
          <br />
          <Form.Label style={{ fontWeight: 600 }}>Technology</Form.Label>
        </Form.Group>

        <Form.Group>
          <Form.Label>Difficulty</Form.Label>
          <br />
          <Form.Label style={{ fontWeight: 600 }}>Beginner</Form.Label>
        </Form.Group>
      </div>
    </>
  );
};

export default AssesmentInfoTab