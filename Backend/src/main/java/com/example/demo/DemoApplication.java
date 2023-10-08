package com.example.demo;

import com.example.demo.Collection.Course;
import com.example.demo.Email.EmailService;
import com.example.demo.Repository.CourseRepository;
import jakarta.mail.MessagingException;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DemoApplication {
	private final EmailService emailService;

	public DemoApplication(EmailService emailService) {
		this.emailService = emailService;
	}


	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
	@Bean
	CommandLineRunner runner (CourseRepository repository ){
		return args -> {


			Course course = new Course("CSC3002S", "Introduction to Programming");

			/*
			CourseController controller = new CourseController();
			* */
			/*controller.addLecturerToCourse("csc1015",new Lecturer("Rea"));*/
			repository.findCourseByCourseCode(course.getCourseCode()). // Call the controller
					ifPresentOrElse(c -> {
						System.out.println("already exists");
					},

					() -> {
						System.out.println("Not Present");

						repository.insert(course);
					});
			/*	try {
			 *//*emailService.sendRegisterationConfirmation("reabetsoempapa44@gmail.com");*//*
			} catch (MessagingException e) {
				throw new RuntimeException(e);
			}
			};*/
		};}

	}




