package com.example.demo.Email;
import com.example.demo.Collection.Course;
import com.example.demo.Collection.Tutor;
import com.example.demo.Collection.Tutorial;
import com.example.demo.Collection.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmailService {
        private final JavaMailSender javaMailSender;
    // Constructor for EmailService that initializes the JavaMailSender
        public EmailService(JavaMailSender javaMailSender) {
            this.javaMailSender = javaMailSender;
        }

    // Method to send registration confirmation email to a user
    public void sendRegisterationConfirmation(String to, User user) throws MessagingException {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();

            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            mimeMessageHelper.setFrom("mytutorwebsitecs@gmail.com");
            mimeMessageHelper.setTo(to);

            mimeMessageHelper.setText("Hello, You have successfully registered on the myTutor website.");
            mimeMessageHelper.setSubject("MyTutor Website Registration Confirmation");

            javaMailSender.send(mimeMessage);

        }
    // Method to send an email notifying a course convener about their role in a course
        public void sendAdditionCourseconvener(Optional<Course> course, String courseConvener) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

        mimeMessageHelper.setFrom("mytutorwebsitecs@gmail.com");
        mimeMessageHelper.setTo(courseConvener);

        mimeMessageHelper.setText("Good day, \n You have been added to "+course.get().getCourseName()+" page in the MyTutor Management System.");
        mimeMessageHelper.setSubject("You are a "+course.get().getCourseCode()+" Course Convener ");

        javaMailSender.send(mimeMessage);

    }
    // Method to send an email to a tutor regarding their appointment
    public void sendTutorEmail(Tutor tutor) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

        mimeMessageHelper.setFrom("mytutorwebsitecs@gmail.com");
        mimeMessageHelper.setTo(tutor.getStudentID()+"@myuct.ac.za");

        mimeMessageHelper.setText("Good day " +tutor.getName()+ tutor.getName()+" \nCongratulations on your appointment as a Tutor. Check the myTutor website for more details on the appointment");
        mimeMessageHelper.setSubject("Tutor Appointment");

        javaMailSender.send(mimeMessage);
    }
    // Method to send an email to a tutor confirming their tutorial sign-up
    public void sendTutorialAddition(Tutor tutor, Optional<Tutorial> tutorial) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

        mimeMessageHelper.setFrom("mytutorwebsitecs@gmail.com");
        mimeMessageHelper.setTo(tutor.getStudentID()+"@myuct.ac.za");

        mimeMessageHelper.setText("Good day, \n You have signed up for the " + tutorial.get().getCourseCode() +" tutorial on "+ tutorial.get().getDayOfWeek()+" "+ tutorial.get().getTime() +" at " +tutorial.get().getVenue() +".");
        mimeMessageHelper.setSubject(" Tutorial Sign up Confirmation ");

        javaMailSender.send(mimeMessage);
    }
}

