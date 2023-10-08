package com.example.demo.Repository;

import com.example.demo.Collection.ApplicationCreation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ApplicationCreationRepository extends MongoRepository<ApplicationCreation, String> {
    Optional<ApplicationCreation> findApplicationCreationByDepartment(String Department);


}
