package com.example.demo.Repository;

import com.example.demo.Collection.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
public interface AdminRepository extends MongoRepository<Admin, String> {
    Optional<Admin> findAdminByEmployeeID(String employeeID);



}
