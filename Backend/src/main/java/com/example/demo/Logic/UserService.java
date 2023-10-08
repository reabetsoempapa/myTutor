package com.example.demo.Logic;

import com.example.demo.Collection.User;
import com.example.demo.Email.EmailService;
import com.example.demo.Repository.EmailValidator;
import com.example.demo.Repository.UserRepository;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final EmailValidator emailValidator;
    private final EmailService emailService;

    // Method to get a user by their email
    public User getUser(String email){
        Optional<User> optionalUser = userRepository.findUserByEmail(email);
        return optionalUser.orElse(null);
    }
    // Method to get all users
    public List<User>getAllUsers()
    {
        return userRepository.findAll();

    }
    // Method to add a user with registration confirmation email
    public ResponseEntity<String> addUser (User user) throws MessagingException {
        boolean isValidEmail = emailValidator.test(user.getEmail());

        if ((userRepository.findUserByEmail(user.getEmail()).isPresent()))
        {
            System.out.println("Duplicate");
            return new ResponseEntity<>("Email already Registered", HttpStatus.BAD_REQUEST);
            }

        if(!isValidEmail ) {return new ResponseEntity<>("Please enter a UCT email", HttpStatus.BAD_REQUEST);}

        else {
            userRepository.insert(user);
            emailService.sendRegisterationConfirmation(user.getEmail(), user);             // Send a registration confirmation email to the new user
            return  new ResponseEntity<>("User added", HttpStatus.OK);
        }}



    // Method to delete a user by their ID
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
    // Method for user login validation
    public boolean login(String email , String password) {

        Optional<User> user1 = userRepository.findUserByEmail(email);

        return (user1.isPresent()) && password.equals(user1.get().getPassword());

    }
    // Method to promote a user's role to "tutor"
    public void makeRoleTutor(String username) {
        System.out.println("Got here");
        Optional<User> usertobePromoted = userRepository.findUserByEmail(username);
        if (usertobePromoted.isPresent()){
           User  user= usertobePromoted.get();
           user.setRole("tutor");
            userRepository.save(user);
            System.out.println("Done");
        }
    }

    // Method to update user information, including password and role
    @Transactional
    public void updateUser(User user) {
    Optional<User> users = userRepository.findUserByEmail(user.getEmail());
    if (users.isPresent()) {
        User user1 = users.get();
        user1.setPassword(user.getPassword());
        user1.setRole(user.getRole());
        userRepository.save(user1);

        }

    }
}



