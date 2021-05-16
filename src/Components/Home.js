import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import OtpVerify from './OtpVerify';
import { Url_GetOtp } from '../Constant/apiConstant';
import { Get } from '../utilis';
import {mobileNumberMsg} from '../Constant/messageConstant';

//Home component responsible for take the user data and send OTP
const Home = (props) => {

    //Set view as per request
    const [showOTP, setShowOTP] = useState(false);

    //By using use state hook hold the data into variable.
    const [mobilenumber, setMobileNumber] = useState();

    //Store delivered OTP
    const [result, setResult] = useState([]);
    
    useEffect(() => {
        document.title = "Home";       
    }, []);

    const onChangeMobileHandler = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setMobileNumber(e.target.value)
        }
    }

    //on submit push the data to api
    const submit = (e) => {
        e.preventDefault();

        if(mobilenumber !== '')
        {
            //Create get API request for OTP
            Get(Url_GetOtp, {
                params: { id: mobilenumber }
            })
                .then(function (response) {
                    // handle success                         
                    setResult(response.data);
                    setShowOTP(true);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        }

        if (!mobilenumber) {
            alert(mobileNumberMsg);                        
        }
        else {
            setMobileNumber("");
        }
    };

    return (
        <>
            <Form className="py-4" onSubmit={submit}>
                <FormGroup>
                    {
                        !showOTP && props.location.state === "home" ?
                            <p className="text-center">Sign up</p> : null                            
                    }
                    {
                        !showOTP && props.location.state === "signin" ?
                        <p className="text-center">Login</p> : null
                    }
                </FormGroup>
                <FormGroup>
                    {!showOTP ?
                        <FormGroup row>
                            <Label for="mobilenumber" sm={3}>Mobile Number :</Label>
                            <Col sm={1} md={6}>
                                <Input type="text" pattern="[0-9]*" className="phone validate" name="mobilenumber" id="mobilenumber" width="10" placeholder="Enter Mobile Number" maxLength="10" onChange={(e) => onChangeMobileHandler(e)} value={mobilenumber} autoComplete="off" required/>
                            </Col>
                            <Col sm={0}>
                                <Button type="submit" size="sm p-2">Send OTP</Button>
                                {result && result.map((val) => {
                                    return (
                                        <>
                                            <h1>{val.otp}</h1>
                                        </>
                                    )
                                })}
                            </Col>
                            <Col sm={1}>
                                <Button size="sm p-2" type="reset">Clear</Button>
                            </Col>
                        </FormGroup> : null
                    }
                </FormGroup>
            </Form>
            <Form>
                <FormGroup>
                    {
                        showOTP ? result && result.map((val) => { return (<OtpVerify otpData={val.otp} requestFrom={props.location.state} />) }) : null
                    }
                </FormGroup>
            </Form>
        </>
    );
};

export default Home;