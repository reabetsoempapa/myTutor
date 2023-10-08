package com.example.demo.Repository;
import com.example.demo.Collection.Tutorial;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TutorialRepository extends MongoRepository<Tutorial, String> {

    Optional<Tutorial> findTutorialByTutorialID(String tutorialID);
    @Query("{'courseCode': ?0}")
    List<Tutorial> findTutorialBy(String courseCode);


}
