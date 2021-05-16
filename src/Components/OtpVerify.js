import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import Signup from './Signup';
import { Url_ValidateUser, Url_AddUser } from '../Constant/apiConstant';
import {userExistMsg, completeSignupMgs, notValidOTPMsg} from '../Constant/messageConstant';
import {Get, Post} from '../utilis';

//OtpVerify component responsible for to validate OTP.
const OtpVerify = (props) => {

  // By using use state hook hold the data into variable.
  const [otp, setOtp] = useState("");

  //Set view as per request
  const [showUserDetails, setUserDetails] = useState(false);

  useEffect(() => {
    document.title = "Otp verification";    
  }, []);


  const onChangeOTPhandle = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setOtp(e.target.value)
    }
  }

  const VerifyOTP = (e) => {
    e.preventDefault();  
    
    if (otp === props.otpData) {      
      //Create get API request for validate user
      Get(Url_ValidateUser, {
        params: { otp: otp }
      })
        .then(function (response) {
          // handle success

          for (let item of response.data) {
            if (item.userexists > 0) {
              alert(userExistMsg);
            }
            else {
              if (props.requestFrom === "home") {
                setUserDetails(true);
              }
              else {
                alert(completeSignupMgs);                
                Post(Url_AddUser, {
                  params: {
                    otp : otp,
                    fullname : '',
                    email : '',                    
                    operationtype : 'D'
                  }
                }).then(function (error, response) {
                    console.log(error);
                });
              }
            }
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
    else {
      alert(notValidOTPMsg);
      onClear();
    }
  }

  const onClear=()=>{
    setOtp("");
  }

  return (
    <>
      <Form className="py-4">
        <FormGroup>
          {!showUserDetails ?
            <FormGroup row>
              <h1>{props.otpData}</h1>
              <Label for="otp" sm={2}> OTP :</Label>
              <Col sm={2} md={6}>
                <Input type="text" value={otp} onChange={(e) => onChangeOTPhandle(e)} maxLength="6" className="phone validate" name="otp" id="otp" width="10" placeholder="Enter OTP" autoComplete="off" required/>
              </Col>
              <Col md={1}>
                <Button className="button" type="button" onClick={(e) => { VerifyOTP(e) }}>Verify</Button>                
              </Col>
              <Col md={0}>
                <Button className="button" onClick={(e)=> { onClear() } }>Clear</Button>                
              </Col>
            </FormGroup> : null
          }
        </FormGroup>
      </Form>
      <Form>
        <FormGroup>
          {
            showUserDetails ? (<Signup otpData={props.otpData} />) : null
          }
        </FormGroup>
      </Form>
    </>
  );
}

export default OtpVerify;