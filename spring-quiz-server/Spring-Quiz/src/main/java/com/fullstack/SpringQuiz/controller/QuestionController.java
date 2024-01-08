package com.fullstack.SpringQuiz.controller;

import com.fullstack.SpringQuiz.model.Question;
import com.fullstack.SpringQuiz.service.IQuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("/api/quizzes")
@RequiredArgsConstructor
public class QuestionController {

    private final IQuestionService questionService;

    @PostMapping("/create-new-question")
    public ResponseEntity<Question> createQuestion(@RequestBody Question question){
        Question createdQuestion = questionService.createNewQuestion(question);
        return  ResponseEntity.status(CREATED).body(createdQuestion);
    }

    @GetMapping("/all-questions")
    public ResponseEntity<List<Question>> getAllQuestions(){
        List<Question> questions = questionService.getAllQuestions();
        return  ResponseEntity.ok(questions);
    }

    @GetMapping("/question/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) throws ChangeSetPersister.NotFoundException {
        Optional<Question> question = questionService.getQuestionById(id);
        if(question.isPresent()){
            return  ResponseEntity.ok(question.get());
        }else {
            throw  new ChangeSetPersister.NotFoundException();
        }
    }

    @PutMapping("/update-question/{id}")
    public ResponseEntity<Question> updateQuestion(
            @PathVariable Long id,
            @RequestBody Question question
    ) throws ChangeSetPersister.NotFoundException {
        Question theUpdatedQuestion = questionService.updateQuestion(id, question);
        return  ResponseEntity.ok(theUpdatedQuestion);
    }

    @DeleteMapping("/delete-question/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id){
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/all-subjects")
    public ResponseEntity<List<String>> getAllSubjects(){
        List<String> subjects = questionService.getAllSubjects();
        return  ResponseEntity.ok(subjects);
    }

    @GetMapping("/questions-for-user")
    public ResponseEntity<List<Question>> getQuestionsForUser(
            @RequestParam Integer numOfQuestions,
            @RequestParam String subject
    ){
        List<Question> questionsForUser = questionService.getQuestionsForUser(numOfQuestions,subject);
        List<Question> mutableQuestions = new ArrayList<>(questionsForUser);
        Collections.shuffle(mutableQuestions);
        int availableQuestions =Math.min(numOfQuestions, mutableQuestions.size());
        List<Question> randomQuestions = mutableQuestions.subList(0, availableQuestions);
        return ResponseEntity.ok(randomQuestions);
    }
}
