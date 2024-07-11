import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Button, Col, Container, Form, FormGroup, FormText, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import classes from './Ticket.module.css';
import AuthContext from '../../../context/AuthContext/AuthContext';
import AdminContext from '../../../context/AdminContext/AdminContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CreateTicket = ({ type }) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const id      = authCtx?.employeeInfo?.id;
  const adminCtx = useContext(AdminContext);
  const [staff, setStaff] = useState({});

  const behalfEmailRef = useRef();
  const [behalf, setBehalf] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const priority = ['high', 'medium', 'low'];
  const [selectedPriority, setSelectedPriority] = useState(null);


  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const floors = ['MRV Building', 'Dormitory', '1st Floor', '2nd Floor', '3rd Floor', '4th Floor', '5th Floor', '6th Floor', '7th Floor', '8th Floor', '9th Floor', '10th Floor'];
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [repeated, setRepeated] = useState(false);

  const [formError, setFormError] = useState('');

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
    if (!modal) {
      resetForm();
    }
  };

  const closeBtn = (
    <button className="close" onClick={toggle} type="button">
      &times;
    </button>
  );

  const resetForm = () => {
    setSelectedDepartment('');
    setSelectedCategory('');
    setSelectedFloor('');
    setDescription('');
    setFormError('');
  };

  useEffect(() => {
    const getStaff = async () => {
      try {
        const response = await axios.get(`https://hello.helpdesk.met.edu/api/staff/staffdetails/${id}`);
        setStaff(response.data.staff);
      } catch (error) {
        console.log(error.message);
      }
    };

    getStaff();
  }, [id]);

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const response = await axios.get('https://hello.helpdesk.met.edu/api/department/');
        setDepartments(response.data.departmentData.filter(department => department.type === 'service'));
      } catch (error) {
        console.log(error.message);
      }
    };
    getDepartments();
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      const department = departments.find(dept => dept.department === selectedDepartment);
      setCategories(department ? department.category : []);
    } else {
      setCategories([]);
    }
  }, [departments, selectedDepartment]);

  const handleDepartmentSelect = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const selectedFilesArray = [...selectedFiles];
    for (let i = 0; i < files.length; i++) {
      selectedFilesArray.push(files[i]);
    }
    setSelectedFiles(selectedFilesArray);
  };

  const cleanHtml = (html) => {
    const strippedHtml = html.replace(/<\/?p>/g, '').trim();
    return strippedHtml;
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    if (description.length === 0) {
      Swal.fire({
        icon: 'error',
        title: `Please enter description`,
        text: 'Please enter valid fields'
      });
    } else {
      const cleanedDescription = cleanHtml(description);
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append('file', file);
      });
      formData.append('staffId', id);
      formData.append('staffDepartment', staff.role === 'admin' ? adminCtx.department : staff.department[0]);
      formData.append('department', selectedDepartment);
      formData.append('category', selectedCategory);
      formData.append('priority', selectedPriority);
      formData.append('subject', subject);
      formData.append('description', cleanedDescription + '\n' + selectedFloor);
      formData.append('behalf', behalf);
      if (behalf) {
        formData.append('behalfEmailId', behalfEmailRef.current.value);
      };
      formData.append('isRepeated', repeated);
      
      try {
        const response = await axios.post(`https://hello.helpdesk.met.edu/api/${type === 'Complaint' ? 'complaint' : 'request'}/`, formData);
        console.log(response);
        resetForm();
        Swal.fire({
          icon: 'success',
          title: `Ticket ${type === 'Complaint' ? 'Complaint' : 'Request'} created successfully`,
          text: 'Thank you for your time'
        });
        navigate(`/${type === 'Complaint' ? 'complaint' : 'request'}`);
      } catch (error) {
        if(error.response.status === 400 || error.response.status === 500 || error.response.status === 422 || error.response.status === 404 || error.response.status === 401 ){
          Swal.fire({
            icon: 'error',
            title: `Error ${error.response.status}`,
            text: `Unable to create ${type === 'Complaint' ? 'Complaint' : 'Request'}`,
          });
          console.log(error.response.data.message);
        }
        else{
          console.log(error.message);
        }
      }
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={12} md={8}>
          <Button className={classes.deptbtn} color="danger" onClick={toggle}>
            Create Ticket
          </Button>
          <Modal isOpen={modal} toggle={toggle} size='xl'>
            <ModalHeader toggle={toggle} close={closeBtn}>Create New Ticket</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmitClick}>
                <Row>
                  <Col md={12} className='mb-4 d-flex justify-content-start align-items-left ' >
                    <FormGroup switch>
                      <Input type="switch" role="switch" id="behalf" name="behalf" onChange={() => setBehalf(!behalf)} />
                      <Label check for="behalf">Behalf &nbsp;&nbsp;</Label>
                    </FormGroup>
                    {behalf && (
                      <FormGroup>
                        {/* <Label for="behalfEmail">Email</Label> */}
                        <Input type="email" id="behalfEmail" name="behalfEmail" placeholder="Enter email" ref={behalfEmailRef} required />
                      </FormGroup>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="selectDepartment">Department</Label>
                      <Input id="selectDepartment" name="selectDepartment" type="select" className='w-100 p-1' onChange={handleDepartmentSelect} required>
                        <option key={'default'} value="" hidden>----- Select Department -----</option>
                        {departments.map((department) => (
                          <option key={department.id} value={department.department}>{department.department}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="priority" >Priority</Label>
                      <Input id="priority" name="priority" type="select" className='w-100 p-1' onChange={(e) => setSelectedPriority(e.target.value)} invalid={formError ? true : false} required>
                        <option key={'default'} value="" hidden>----- Select Priority -----</option>
                        {priority.map((priority) => (
                          <option key={priority} value={priority}>{priority}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="ticketType">{type === 'Complaint' ? 'Complaint Type' : 'Request Type'}</Label>
                      <Input id="ticketType" name="ticketType" type="select" className='w-100 p-1' onChange={handleCategorySelect} required>
                        <option key={'default'} value="" hidden>{type === 'Complaint' ? '---- Select Complaint Type ----' : '---- Select Request Type ----'}</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="location">Location</Label>
                      <Input id="location" name="location" className='w-100 p-2' placeholder="Enter your location" type="select" onChange={(e) => setSelectedFloor(e.target.value)} required>
                        <option key={'default'} value="" hidden>----- Select Location -----</option>
                        {floors.map((floor) => (
                          <option key={floor} value={floor}>{floor}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="subject">Subject</Label>
                      <Input id="subject" name="subject" placeholder="Subject" type="text" onChange={(e) => setSubject(e.target.value)} required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="description">Description</Label>
                      <CKEditor
                        editor={ClassicEditor}
                        data=""
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setDescription(data);
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleFile" > File </Label>
                      <Input
                        id="exampleFile"
                        name="file"
                        type="file"
                        onChange={handleFileChange}
                      />
                      <FormText color='red'>
                        *File size is limited to 5MB*
                      </FormText>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup switch >
                      <Input type="switch" role="switch" id='repeated' name='repeated' onChange={() => setRepeated(!repeated)} />
                      <Label check for="repeated" > {type === 'Complaint' ? 'Repeat Complaint' : 'Repeat Request'} </Label>
                    </FormGroup>
                  </Col>
                </Row>
                <br />
                <Button type="submit">Submit</Button>
                {formError && <div className="text-danger mt-2">{formError}</div>}
              </Form>
            </ModalBody>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateTicket;
