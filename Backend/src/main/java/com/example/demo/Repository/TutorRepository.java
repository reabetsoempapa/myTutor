package com.example.demo.Repository;

import com.example.demo.Collection.Tutor;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TutorRepository extends MongoRepository<Tutor,String> {
    Optional<Tutor> findTutorByStudentID(String studentID);


}
