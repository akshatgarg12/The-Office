import { useState } from "react";
import {
  Form,
  Label,
  Input,
  Segment,
  Container,
  Message,
  Menu,
} from "semantic-ui-react";
import {
  genderOptions,
  jobOptions,
  positionOptions,
  branchOptions,
} from "./options";
import PreviewEmployeeInfo from "../PreviewEmployeeInfo";
import { REQUEST } from "../../../actions/http";
import "./style.css";
import ImageUploaderComponent from "../../atoms/imageUploader";

const AddEmployeeForm = () => {
  // state
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    department: "",
    position: "",
    branch: "",
    salary: "",
    isAdmin: false,
    dob: "",
    img: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    show: false,
    type: null,
    header: null,
    content: false,
  });
  const [activeMenu, setActiveMenu] = useState("form");

  // functions

  const changeHandler = (e, { name, value }) => {
    e.preventDefault();
    setDetails({
      ...details,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const requestData = await REQUEST({
        path: "/api/employee",
        method: "POST",
        data: details,
        setLoading,
      });
      console.log(requestData);
      setMessage({
        show: true,
        type: "success",
        header: "Success",
        content: `A new Employee has been created with ID : ${requestData}`,
      });
    } catch (e) {
      console.log(e.message);
      setMessage({
        show: true,
        type: "error",
        header: "Error",
        content: e.message,
      });
    }
  };
  const handleMenuChange = (e, { name }) => setActiveMenu(name);
  return (
    <Container>
      <Menu attached="top" tabular inverted>
        <Menu.Item
          name="form"
          active={activeMenu === "form"}
          onClick={handleMenuChange}
        />

        <Menu.Item
          name="image"
          active={activeMenu === "image"}
          onClick={handleMenuChange}
        />

        <Menu.Item
          name="preview"
          active={activeMenu === "preview"}
          onClick={handleMenuChange}
        />
      </Menu>
      {activeMenu === "image" ? (
        <ImageUploaderComponent details={details} setDetails={setDetails} />
      ) : activeMenu === "form" ? (
        <Segment attached="bottom" inverted className="form-container">
          <h1>Add A New Employee</h1>
          <Form
            inverted
            onSubmit={submitHandler}
            loading={loading}
            className="form-container"
          >
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="First name"
                placeholder="First name"
                name="firstName"
                onChange={changeHandler}
                value={details.firstName}
              />
              <Form.Input
                fluid
                label="Last name"
                placeholder="Last name"
                name="lastName"
                onChange={changeHandler}
                value={details.lastName}
              />
              <Form.Select
                fluid
                label="Gender"
                options={genderOptions}
                placeholder="Gender"
                name="gender"
                onChange={changeHandler}
                value={details.gender}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Select
                fluid
                label="Department"
                options={jobOptions}
                placeholder="Department"
                name="department"
                value={details.department}
                onChange={changeHandler}
              />
              <Form.Select
                fluid
                label="Job Position"
                options={positionOptions}
                placeholder="Job Position"
                name="position"
                value={details.position}
                onChange={changeHandler}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="email"
                placeholder="Email"
                type="email"
                name="email"
                onChange={changeHandler}
                value={details.email}
              />
              <Form.Field>
                <label>Salary</label>
                <Input
                  fluid
                  label="salary"
                  placeholder="Amount"
                  name="salary"
                  value={details.salary}
                  onChange={changeHandler}
                >
                  <Label basic>$</Label>
                  <input />
                </Input>
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                type="date"
                label="date of birth"
                placeholder="DOB"
                value={details.dob}
                name="dob"
                onChange={changeHandler}
              />
              <Form.Select
                fluid
                label="Branch"
                options={branchOptions}
                placeholder="Branch"
                name="branch"
                value={details.branch}
                onChange={changeHandler}
              />
            </Form.Group>
            <Form.Checkbox
              label="is Admin"
              name="isAdmin"
              checked={details.isAdmin}
              onChange={(e, { name, checked }) =>
                setDetails({
                  ...details,
                  [name]: checked,
                })
              }
            />
            <Form.Button>Submit</Form.Button>
          </Form>
          {message.show && (
            <Message
              error={message.type === "error"}
              success={message.type === "success"}
              header={message.header}
              content={message.content}
            />
          )}
        </Segment>
      ) : (
        <PreviewEmployeeInfo details={details} />
      )}
    </Container>
  );
};

export default AddEmployeeForm;
