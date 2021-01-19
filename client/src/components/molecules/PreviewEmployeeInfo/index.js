import { Form, Segment, Image } from "semantic-ui-react";

const PreviewEmployeeInfo = ({ details }) => {
  return (
    <Segment attached="bottom" inverted className="form-container">
      <Image src={details.img} size="medium" centered />
      <Form inverted className="form-container">
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="First name"
            readOnly
            value={details.firstName}
          />
          <Form.Input
            fluid
            label="Last name"
            readOnly
            value={details.lastName}
          />
          <Form.Input fluid label="Gender" readOnly value={details.gender} />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Department"
            readOnly
            value={details.department}
          />
          <Form.Input
            fluid
            label="Department"
            readOnly
            value={details.position}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input fluid label="branch" readOnly value={details.branch} />
          <Form.Input fluid label="email" readOnly value={details.email} />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input label="date of birth" value={details.dob} readOnly />
          <Form.Input label="salary" value={details.salary} readOnly />
        </Form.Group>
        <Form.Checkbox label="is Admin" checked={details.isAdmin} />
      </Form>
    </Segment>
  );
};
export default PreviewEmployeeInfo;
