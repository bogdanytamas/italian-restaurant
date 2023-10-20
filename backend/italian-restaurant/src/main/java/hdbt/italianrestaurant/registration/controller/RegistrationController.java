package hdbt.italianrestaurant.registration.controller;

import hdbt.italianrestaurant.registration.dto.RegistrationRequestDTO;
import hdbt.italianrestaurant.registration.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping(value = "/api", method = {RequestMethod.GET, RequestMethod.POST})
public class RegistrationController {

    private final RegistrationService registrationService;

    @Autowired
    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegistrationRequestDTO requestDTO) {
        registrationService.registerNewUser(requestDTO);
        return new ResponseEntity<>("Sikeres regisztráció!", HttpStatus.CREATED);
    }

}
