package com.example.lms_springboot.controller;

import com.example.lms_springboot.model.Author;
import com.example.lms_springboot.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/authors")
public class AuthorController {

    @Autowired
    private AuthorService authorService;


    @PostMapping
    public Author createBook(@RequestBody Author author) {
        return authorService.createAuthor(author);
    }

    @GetMapping
    public List<Author> getAllAuthors() {
        return authorService.getAllAuthors();
    }


    @GetMapping("/{id}")
    public Optional<Author> getAuthorById(@PathVariable String id) {
        return authorService.getAuthorById(id);
    }

    @PutMapping("/{id}")
    public Author updateAuthor(@PathVariable String id, @RequestBody Author author) {
        return authorService.updateAuthor(id, author);
    }

    @DeleteMapping("/{id}")
    public void deleteAuthor(@PathVariable String id) {
        authorService.deleteAuthor(id);
    }
}
