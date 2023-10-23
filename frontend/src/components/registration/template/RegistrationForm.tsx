import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../style.css';
import RegistrationService from '../service/RegistrationService';

const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [emailTouched, setEmailTouched] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [rePassword, setRepassword] = useState('');
    const [rePasswordTouched, setRePasswordTouched] = useState(false);
    const [policy, setPolicy] = useState(false);
    const [policyTouched, setPolicyTouched] = useState(false);
    const registrationService = new RegistrationService();

    function handleEmailChange(e: any) {
        if (!emailTouched) {
            setEmailTouched(true);
        }
        setEmail(e.target.value);
    }

    function isEmailValid(email: string) {
        const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
        return emailRegex.test(email);
    }

    function handlePasswordChange(e: any) {
        if (!passwordTouched) {
            setPasswordTouched(true);
        }
        setPassword(e.target.value);
    }

    function isPasswordValid(password: string) {
        //Jelszó logikák
        return password.length > 3;
    }

    function handleRePasswordChange(e: any) {
        if (!rePasswordTouched) {
            setRePasswordTouched(true);
        }
        setRepassword(e.target.value);
    }

    function isPasswordsEquals(password: string, repassword: string) {
        return password == repassword;
    }

    function handlePoliciyChange(e: any) {
        if (!policyTouched) {
            setPolicyTouched(true);
        }
        setPolicy(!policy);
    }

    function isPolicyChecked(checkBoxValue: boolean) {
        return checkBoxValue;
    }

    function registrationFormValidator() {
        return  isEmailValid(email) &&
                isPasswordValid(password) &&
                isPasswordsEquals(password, rePassword) &&
                isPolicyChecked(policy);
    }

    function handleRegistration() {
        if (registrationFormValidator()) {
            const registrationData: RegistrationModel = { 'email': email, 'password': password };
            registrationService.postRegistration(registrationData);
        }
    };

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
    };

    return (
        <>
            <div className='registration-container'>
                <div className='registration-form-container'>
                <h1 className='form-title'>Regisztráció</h1>
                    <Form noValidate validated={registrationFormValidator()} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 form-field">
                            <Form.Control
                            required
                            isValid={isEmailValid(email)}
                            isInvalid={emailTouched && !isEmailValid(email)}
                            type="email"
                            placeholder="Email cím"
                            value={email}
                            onChange={(e) => handleEmailChange(e)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Kérem adjon meg egy érvényes email címet.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3 form-field">
                            <Form.Control
                            required
                            isValid={isPasswordValid(password)}
                            isInvalid={passwordTouched && !isPasswordValid(password)}
                            type="password"
                            placeholder="Jelszó"
                            value={password}
                            onChange={(e) => handlePasswordChange(e)}
                            />
                            <Form.Control.Feedback type="invalid">
                                A jelszó minimum 4 karakter hosszú legyen.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3 form-field">
                            <Form.Control
                            required
                            isValid={rePasswordTouched && isPasswordsEquals(password, rePassword)}
                            isInvalid={rePasswordTouched && !isPasswordsEquals(password, rePassword)}
                            type="password"
                            placeholder="Jelszó mégegyszer"
                            value={rePassword}
                            onChange={(e) => handleRePasswordChange(e)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Nem egyezik meg a két jelszó.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Check
                            required
                            isValid={isPolicyChecked(policy)}
                            isInvalid={policyTouched && !isPolicyChecked(policy)}
                            feedback="Kérem fogadja el a felhasználói feltételeket."
                            feedbackType="invalid"
                            type="checkbox"
                            label="Elfogadom a felhasználói feltételeket."
                            checked={policy}
                            onChange={(e) => handlePoliciyChange(e)}
                            />
                        </Form.Group>

                        <Button
                        variant="danger"
                        type="submit"
                        className='mb-3 form-field'
                        onClick={handleRegistration}
                        >
                            Regisztráció
                        </Button>

                        <Form.Group className="mb-3">
                            <div className='registration-login'>
                                <p>Már regisztrált felhasználó?</p>
                                <a href=''>Jelentkezzen be</a>
                            </div>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </>
    );
  }
  
  export default RegistrationForm;