package com.example.lms_springboot.service;

import com.example.lms_springboot.model.Book;
import com.example.lms_springboot.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class BookService {

    private static final Logger log = LoggerFactory.getLogger(BookService.class);


    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Book createBook(Book book) {
        book.setBookId(UUID.randomUUID().toString().split("-")[0]);
        return bookRepository.save(book);
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }


    public Optional<Book> getBookById(String id) {
        //log.info("Looking for book with ID: {}", id);
        return bookRepository.findById(id);
    }

    public Book updateBook(String id, Book book) {
        book.setBookId(id);
        return bookRepository.save(book);
    }

    public void deleteBook(String id) {
        bookRepository.deleteById(id);
    }
}

