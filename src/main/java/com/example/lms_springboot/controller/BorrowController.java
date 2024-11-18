package com.example.lms_springboot.controller;

import com.example.lms_springboot.model.Borrow;
import com.example.lms_springboot.service.BorrowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/borrows")
public class BorrowController {

    @Autowired
    private BorrowService borrowService;

    @PostMapping
    public ResponseEntity<Borrow> borrowBook(@RequestBody Borrow borrowRequest) {
        Borrow borrow = borrowService.borrowBook(borrowRequest.getMemberId(), borrowRequest.getBookId());
        return ResponseEntity.ok(borrow);
    }

    @GetMapping
    public ResponseEntity<List<Borrow>> getAllBorrows() {
        List<Borrow> borrows = borrowService.getAllBorrows();
        return ResponseEntity.ok(borrows);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Borrow> getBorrowById(@PathVariable String id) {
        Borrow borrow = borrowService.getBorrowById(id);
        return ResponseEntity.ok(borrow);
    }

    //Two different actions - Different responsibility from user prospective
    //Then different apis like return and lost.
    // resource/action - separate responsibility

    @PutMapping("/{id}/mark-as-lost")
    public ResponseEntity<Borrow> markAsLost(@PathVariable String id) {
        try {
            Borrow borrow = borrowService.markAsLost(id);
            return ResponseEntity.ok(borrow);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @PutMapping("/{id}/return")
    public ResponseEntity<Borrow> returnBook(@PathVariable String id) {
        try {
            Borrow borrow = borrowService.returnBook(id);
            return ResponseEntity.ok(borrow);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    }

