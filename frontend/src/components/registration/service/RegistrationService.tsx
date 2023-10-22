import React from 'react';

class RegistrationService {
    BASE_URL: string = 'http://localhost:8080';
    registerApiUrl: string = this.BASE_URL + '/api/register';

    async postRegistration(registrationData: RegistrationModel) {
        const requestOptions = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(registrationData)
        };

        try {
            await fetch(this.registerApiUrl, requestOptions)
            .then(response => console.log(response));
        } catch (error) {
            console.error('Hiba történt a regisztráció során: ' + error);
        }
    }
}

export default RegistrationService;