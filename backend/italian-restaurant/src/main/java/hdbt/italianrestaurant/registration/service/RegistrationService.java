package hdbt.italianrestaurant.registration.service;

import hdbt.italianrestaurant.registration.dto.RegistrationRequestDTO;
import hdbt.italianrestaurant.registration.exception.EmailAlreadyExistsException;
import hdbt.italianrestaurant.user.entity.User;
import hdbt.italianrestaurant.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public RegistrationService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerNewUser(RegistrationRequestDTO request) {
        if (userRepository.findByEmail(request.getEmail()) != null) {
            throw new EmailAlreadyExistsException("Az email cím már regisztrálva van!");
        }

        User newUser = new User();
        newUser.setEmail(request.getEmail());
        newUser.setPassword(encodePassword(request.getPassword()));

        return userRepository.save(newUser);
    }

    private String encodePassword(String password) {
        String encodedPassword = passwordEncoder.encode(password);
        return encodedPassword;
    }

}
