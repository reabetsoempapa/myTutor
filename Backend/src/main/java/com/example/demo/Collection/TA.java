package com.example.demo.Collection;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
// Annotate the class as a Spring Data MongoDB Document

@Data
@Document
public class TA extends User {
        // Annotate a field as the document identifier

        @Id
        private String studentID;
        private String name;
// Getter and setter methods for the fields are automatically generated by Lombok


}
