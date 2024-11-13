package com.example.lms_springboot.controller;

import com.example.lms_springboot.model.Borrow;
import com.example.lms_springboot.service.BorrowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/return")
    public ResponseEntity<Borrow> returnBook(@RequestBody Borrow borrowRequest) {
        Borrow borrow = borrowService.returnBook(borrowRequest.getBorrowId());
        if (borrow != null) {
            return ResponseEntity.ok(borrow);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
