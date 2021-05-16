import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { Url_AddUser } from '../Constant/apiConstant';
import { signupCompletedMsg, signupRequiredFieldMsg } from '../Constant/messageConstant';
import { Post } from '../utilis';

//Signup component responsible for store user details
const Signup = (props) => {

  useEffect(() => {
    document.title = "Sign up";    
  }, []);

  //By using use state hook hold the data into variable.
  const [fullname, setName] = useState("");
  const [email, setEmail] = useState("");

  //on submit push the data to api
  const Save = (e) => {
    e.preventDefault();


    //Create API post request for add user.
    if (fullname !== '' && email !== '') {
      Post(Url_AddUser, {
        fullname: fullname,
        email: email,
        otp: props.otpData,
        operationtype: 'C'
      }).then((response) => {
        // handle response        
        alert(signupCompletedMsg);
      }).catch(function (error) {
        // handle error
        console.log(error);
      });
    }


    if (!fullname || !email) {
      alert(signupRequiredFieldMsg);
    }
    else {
     onClear();   
    }
  };

  const onClear=()=>{
    setName("");
    setEmail("");   
  }

  return (
    <Form className="py-4">
      <FormGroup row>
        <Label for="fullname" sm={2}>Name :</Label>
        <Col sm={6}>
          <Input type="text" value={fullname} maxLength="25" className="text validate" name="fullname" id="fullname" width="10" placeholder="Enter Full Name" onChange={(e) => setName(e.target.value)} autoComplete="off" required />
        </Col>
      </FormGroup>
      <FormGroup row py-1>
        <Label for="email" sm={2}>Email Id :</Label>
        <Col sm={6}>
          <Input type="email" value={email} maxLength="25" className="email validate" name="email" id="email" width="10" placeholder="Enter Email Id" onChange={(e) => setEmail(e.target.value)} autoComplete="off" required />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col sm={7}>
          <Button type="button" className="btn" onClick={(e) => { Save(e) }}>Save</Button>
          &nbsp;&nbsp;&nbsp;
          <Button className="btn" type="reset" onClick={(e) => {onClear()}}>Clear</Button>
        </Col>
      </FormGroup>
    </Form>
  );
};

export default Signup;