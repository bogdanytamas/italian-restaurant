package hdbt.italianrestaurant.login.service;

import hdbt.italianrestaurant.login.dto.LoginRequestDTO;
import hdbt.italianrestaurant.login.exception.LoginFailedException;
import hdbt.italianrestaurant.user.entity.User;
import hdbt.italianrestaurant.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public LoginService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /*
    Ezt sem használjuk jelenleg. Ha a későbbiekben saját belépési üzleti logikát
    akarunk akkor felhasználhatjuk.
     */
    public User login(LoginRequestDTO loginRequestDTO) {
        User user = userRepository.findByEmail(loginRequestDTO.getEmail());

        if (user == null) {
            throw new LoginFailedException("Hibás felhasználónév vagy jelszó!");
        }

        if (!passwordEncoder.matches(loginRequestDTO.getPassword(), user.getPassword())) {
            throw new LoginFailedException("Hibás felhasználónév vagy jelszó!");
        }

        return user;
    }

}
