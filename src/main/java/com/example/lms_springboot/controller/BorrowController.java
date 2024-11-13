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

    //GET is used to retrieve data without modifying it.
    @PostMapping("/return")
    public ResponseEntity<Borrow> returnBook(@RequestBody Borrow borrowRequest) {
        Borrow borrow = borrowService.returnBook(borrowRequest.getBorrowId());
        return ResponseEntity.ok(borrow);
    }


}
