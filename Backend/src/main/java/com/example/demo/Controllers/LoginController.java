package com.example.demo.Controllers;

import com.example.demo.Collection.User;
import com.example.demo.Logic.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/v1/login")
@AllArgsConstructor
public class LoginController {


    private final UserService userService;

    // POST endpoint to handle login submission
    @PostMapping
    public boolean loginSubmit(@RequestBody User user ) {
System.out.println(user.getEmail()+" -"+user.getPassword());
        // Delegate the login logic to the UserService
       return userService.login(user.getEmail(), user.getPassword());
    }


}
