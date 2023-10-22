import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../style.css';
import RegistrationService from '../service/RegistrationService';

const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const registrationService = new RegistrationService();

    function handleRegistration() {
        const registrationData: RegistrationModel = { 'email': email, 'password': password };
        registrationService.postRegistration(registrationData);
    };

    return (
        <>
            <div className='registration-container'>
                <div className='registration-form-container'>
                <h1 className='form-title'>Regisztráció</h1>
                    <Form>
                        <Form.Group className="mb-3 form-field">
                            <Form.Control
                            type="email"
                            placeholder="Email cím"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 form-field">
                            <Form.Control
                            type="password"
                            placeholder="Jelszó"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 form-field">
                            <Form.Control type="password" placeholder="Jelszó mégegyszer" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Check type="checkbox" label="Elfogadom a felhasználói feltételeket." />
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