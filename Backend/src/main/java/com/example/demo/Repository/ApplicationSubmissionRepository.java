package com.example.demo.Repository;

import com.example.demo.Collection.ApplicationSubmission;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository

public interface ApplicationSubmissionRepository extends MongoRepository<ApplicationSubmission, String> {
    Optional<ApplicationSubmission> findApplicationSubmissionByStudentNumber(String studentNumber);

}
