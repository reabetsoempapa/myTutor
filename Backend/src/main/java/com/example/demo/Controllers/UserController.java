package com.example.demo.Controllers;
import com.example.demo.Collection.User;
import com.example.demo.Logic.UserService;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*API*/
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/v1/users")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    // GET endpoint to fetch all users
    @GetMapping
    public List<User> fetchAllUsers(){
        return userService.getAllUsers();}
    // GET endpoint to get a user by ID
    @GetMapping("/{id}")
    public User getUser(@ PathVariable String id) {
        return userService.getUser(id);}
    // POST endpoint to add a new user
    @PostMapping("/adduser")
    public void addUser(@RequestBody User user) throws MessagingException {
        userService.addUser(user);}
    // DELETE endpoint to delete a user by ID
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable String id){
        userService.deleteUser(id);
        return "success";}
    // PUT endpoint to promote a user to a tutor role
    @PutMapping ("/promotetotutor")
    public void ChangerRoletoTutor(@RequestBody String username){
        userService.makeRoleTutor(username);
    }

    // PUT endpoint to update user details
    @PutMapping("/updateUser")
    public void updateUser(@RequestBody User username){
        userService.updateUser(username);
    }


}


