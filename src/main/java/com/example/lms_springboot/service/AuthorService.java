package com.example.lms_springboot.service;

import com.example.lms_springboot.model.Author;
import com.example.lms_springboot.model.Book;
import com.example.lms_springboot.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthorService {

    private final AuthorRepository authorRepository;

    @Autowired
    public AuthorService(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }


    public Author createAuthor(Author author) {
        author.setId(UUID.randomUUID().toString().split("-")[0]);
        return authorRepository.save(author);
    }

    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }

    public Optional<Author> getAuthorById(String id) {
        return authorRepository.findById(id);
    }

    public Author updateAuthor(String id, Author author) {
        author.setId(id);
        return authorRepository.save(author);
    }

    public void deleteAuthor(String id) {
        authorRepository.deleteById(id);
    }
}
