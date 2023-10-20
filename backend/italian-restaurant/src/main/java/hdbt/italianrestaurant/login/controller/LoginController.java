package hdbt.italianrestaurant.login.controller;

import hdbt.italianrestaurant.login.dto.LoginRequestDTO;
import hdbt.italianrestaurant.login.exception.LoginFailedException;
import hdbt.italianrestaurant.login.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api", method = {RequestMethod.GET, RequestMethod.POST})
public class LoginController {

    private LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @GetMapping("api/login")
    public String showLoginForm() {
        return "login";
    }

    /*
    Ez a végpont itt felesleges, később ha szeretnénk
    teljesen saját belépési logikát akkor fel lehet használni.
    */
    @PostMapping("/custom-login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDTO requestDTO) {
        try {
            loginService.login(requestDTO);
            return new ResponseEntity<>("Sikeres belépés!", HttpStatus.OK);
        } catch (LoginFailedException e) {
            return new ResponseEntity<>("Hibás felhasználónév vagy jelszó!", HttpStatus.UNAUTHORIZED);
        }
    }
}
