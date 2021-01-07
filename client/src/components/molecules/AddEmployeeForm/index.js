import {  useState } from 'react';
import { Form , Label, Input, Segment, Container,Message,Menu,Image} from 'semantic-ui-react'
import {genderOptions, jobOptions, positionOptions} from './options';
import axios from 'axios';
import './style.css';

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

const PreviewEmployeeInfo = ({details}) => {
 
  return (
  <Segment attached='bottom' inverted className="form-container">
    <Image src={details.img} size='medium' centered />
      <Form inverted className="form-container">
          <Form.Group widths='equal'>
            <Form.Input fluid label='First name' readOnly value={details.firstName} />
            <Form.Input fluid label='Last name'  readOnly value={details.lastName} />
            <Form.Input fluid label='Gender' readOnly value={details.gender} />
          </Form.Group>
          <Form.Group widths = 'equal'>
          <Form.Input fluid label='Department' readOnly value={details.department} />
          <Form.Input fluid label='Department' readOnly value={details.position} />
            </Form.Group>
            <Form.Group widths = 'equal'>
              <Form.Input fluid label='email' readOnly value={details.email} />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input label="date of birth" value={details.dob}  readOnly/>
              <Form.Input label="salary" value={details.salary} readOnly/>
            </Form.Group>
          <Form.Checkbox label='is Admin' checked={details.isAdmin} />
        </Form>
  </Segment>
  );
}
 
const ImageUploaderComponent = ({details, setDetails}) => {
  const [selectedFile, setSelectedFile]  = useState(null);
  
  const ImageUploader = async () =>{
    if(!selectedFile) return;

    const file = await toBase64(selectedFile);
        const imgUpload = await axios('/api/fileUpload',{
          method:"POST",
          data:{
            file
          },
        })
    console.log(imgUpload.data);
    setDetails({...details, img:imgUpload.data});
  }
 
  return (
    <Segment attached='bottom' inverted className="form-container">
        <Image src={details.img || ""} size='large' centered />
          <Form inverted className="form-container" onSubmit={ImageUploader}>
            <Form.Input type="file" label="Image of Employee" name="img" onChange={(e,{value})=>{
                setSelectedFile(e.target.files[0])
                console.log(e.target.files[0]);
              }}/>
              <Form.Button type='submit'>upload Image</Form.Button>
            </Form>
      </Segment>
  )
}

const AddEmployeeForm = () => {
  // state
  const [details, setDetails] = useState({
      firstName:"",
      lastName:"",
      email:"",
      gender:"",
      department:"",
      position:"",
      salary:"",
      isAdmin:false,
      dob:"",
      img:""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    show:false,
    type:null,
    header:null,
    content:false
  });
  const [activeMenu,setActiveMenu] = useState('form');

  // functions
 
  const changeHandler = (e, {name, value}) => {
    e.preventDefault();
    setDetails({
        ...details,
        [name]:value,
    });
  }


  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true);
    try{
      const requestData = await axios('/api/employee',{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        data:details
      })
      console.log(requestData.data);
      setMessage({
        show:true,
        type:'success',
        header:'Success',
        content:`A new Employee has been created with ID : ${requestData.data}`
      });
    }
    catch(e){
      console.log(e.response.data);
      setMessage({
        show:true,
        type:'error',
        header:'Error',
        content:e.response.data
      });
    }finally{
      setLoading(false);
    } 
  }
  const handleMenuChange = (e,{name}) => setActiveMenu(name);
  return (

    <Container >
      <Menu attached='top' tabular inverted>
        <Menu.Item
          name='form'
          active={activeMenu === 'form'}
          onClick={handleMenuChange}
        />
       
        <Menu.Item
          name='image'
          active={activeMenu === 'image'}
          onClick={handleMenuChange}
        />
        
         <Menu.Item
          name='preview'
          active={activeMenu === 'preview'}
          onClick={handleMenuChange}
        />
      </Menu>
      {activeMenu==="image"? <ImageUploaderComponent details={details} setDetails={setDetails} /> : 
        activeMenu==="form"?<Segment attached='bottom' inverted className="form-container">
        <h1>Add A New Employee</h1>
        <Form inverted onSubmit={submitHandler} loading={loading} className="form-container">
          <Form.Group widths='equal'>
            <Form.Input fluid label='First name' placeholder='First name' name="firstName" onChange={changeHandler} value={details.firstName} />
            <Form.Input fluid label='Last name' placeholder='Last name' name="lastName" onChange = {changeHandler}  value={details.lastName} />
            <Form.Select
              fluid
              label='Gender'
              options={genderOptions}
              placeholder='Gender'
              name="gender"
              onChange = {changeHandler}
              value={details.gender}
            />
          </Form.Group>
          <Form.Group widths = 'equal'>
          <Form.Select
              fluid
              label='Department'
              options={jobOptions}
              placeholder='Department'
              name="department"
              value={details.department}
              onChange = {changeHandler}
            />
            <Form.Select
              fluid
              label='Job Position'
              options={positionOptions}
              placeholder='Job Position'
              name="position"
              value={details.position}
              onChange = {changeHandler}
            />
            </Form.Group>
            <Form.Group widths = 'equal'>
              <Form.Input fluid label='email' placeholder='Email' type="email" name="email" onChange={changeHandler} value={details.email} />
              <Form.Field>
                <label>Salary</label>
                <Input fluid label="salary" placeholder='Amount' name="salary"
                value={details.salary}
                onChange = {changeHandler}>
                  <Label basic>$</Label>
                  <input />
                </Input>
              </Form.Field>
            </Form.Group>

              <Form.Input type="date" label="date of birth" placeholder="DOB" value={details.dob} name="dob" onChange={changeHandler}/>
  
          <Form.Checkbox label='is Admin' name="isAdmin" 
              checked={details.isAdmin}
              onChange = {(e, {name, checked})=> setDetails({
                  ...details,
                  [name]:checked,
              })} 
            />
          <Form.Button>Submit</Form.Button>
        </Form>
        {message.show &&  <Message
          error={message.type === 'error'}
          success = {message.type === 'success'}
          header={message.header}
          content={message.content}
        />}
    </Segment>:<PreviewEmployeeInfo details={details} />}

    </Container>

  );
}

export default AddEmployeeForm;




