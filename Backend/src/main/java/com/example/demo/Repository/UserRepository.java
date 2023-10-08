package com.example.demo.Repository;

import com.example.demo.Collection.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;


public interface UserRepository extends MongoRepository<User,String> {

    Optional<User> findUserByEmail(String email);

}
