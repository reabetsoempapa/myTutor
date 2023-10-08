package com.example.demo.Repository;

import com.example.demo.Collection.TA;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TARepository extends MongoRepository<TA,String> {

    Optional<TA> findTAByStudentID(String s);
}
