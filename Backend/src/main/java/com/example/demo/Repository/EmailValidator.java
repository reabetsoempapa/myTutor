package com.example.demo.Repository;

import org.springframework.stereotype.Service;

import java.util.function.Predicate;
@Service
public  class EmailValidator implements Predicate<String> {

        public boolean test(String s) {
            // Regex to validate email to UCT email
            String regex = "^[a-zA-Z]{6}\\d{3}@myuct\\.ac\\.za$";
            return s.matches(regex);
        }
    }

