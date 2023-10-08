package com.example.demo.Repository;

import com.example.demo.Collection.CourseConvener;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseConvenerRepository extends MongoRepository<CourseConvener,String> {

    Optional<CourseConvener> findCourseConvenerByEmployeeID(String employeeID);
}
