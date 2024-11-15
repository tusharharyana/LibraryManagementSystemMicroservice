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

    @PutMapping("/{id}/return")
    public ResponseEntity<Borrow> returnBook(
            @PathVariable String id,
            @RequestParam(defaultValue = "false") boolean isLost) {

        Borrow borrow = borrowService.returnBook(id, isLost);
        if (borrow != null) {
            return ResponseEntity.ok(borrow);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    }

