import React, { Component } from 'react';
import { FormGroup, Form } from 'reactstrap';
import firebase from '../ExternalMessagingAPI/firebaseinit';

//Created testing purpose to send message on mobile using firebase module.
export default class MessageComponent extends Component {

    setUpRecaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible",
                callback: function (response) {
                    console.log("Captcha Resolved");
                    this.onSignInSubmit();
                },
                defaultCountry: "IN",
            }
        );
    };

    onSignInSubmit = (e) => {
        e.preventDefault();
        this.setUpRecaptcha();
        let phoneNumber = "+91" + "9821277075";
        console.log(phoneNumber);
        let appVerifier = window.recaptchaVerifier;
        firebase
            .auth()
            .signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                // console.log(confirmationResult);
                console.log("OTP is sent");
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    onSubmitOtp = (e) => {
        e.preventDefault();
        let otpInput = this.state.otp;
        let optConfirm = window.confirmationResult;
        // console.log(codee);
        optConfirm
            .confirm(otpInput)
            .then(function (result) {
                // User signed in successfully.
                // console.log("Result" + result.verificationID);
                console.log("success : " + result.user, 'user');
                let user = result.user;
            })
            .catch(function (error) {
                console.log(error);
                alert("Incorrect OTP");
            });
    };

    render() {
        return (
            <Form className="form" onSubmit={this.onSignInSubmit}>
                <FormGroup>
                    <div id="recaptcha-container">
                    </div>
                    <label></label>
                    <button type="submit">Send OTP</button>
                </FormGroup>
            </Form>
        )
    }
}


