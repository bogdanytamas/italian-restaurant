package hdbt.italianrestaurant.user.service;

import hdbt.italianrestaurant.user.entity.User;
import hdbt.italianrestaurant.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow();
    }

    public List<User> getAllUser() {
        return userRepository.findAll();
    }
}
