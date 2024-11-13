package com.example.lms_springboot.service;

import com.example.lms_springboot.model.Borrow;
import com.example.lms_springboot.repository.BorrowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Calendar;

@Service
public class BorrowService {


    @Autowired
    private final BorrowRepository borrowRepository;

    public BorrowService(BorrowRepository borrowRepository) {
        this.borrowRepository = borrowRepository;
    }


    public Borrow borrowBook(String memberId, String bookId) {

        Borrow borrow = new Borrow();
        borrow.setMemberId(memberId);
        borrow.setBookId(bookId);
        borrow.setBorrowDate(new Date());

        //Set return after 30 days from current date.
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.DAY_OF_MONTH, 30);
        Date returnDate = calendar.getTime();

        borrow.setReturnDate(returnDate);

        return borrowRepository.save(borrow);

    }

    public Borrow returnBook(String borrowId) {
        Borrow borrow = borrowRepository.findById(borrowId).orElseThrow(() -> new RuntimeException("Borrow record not found"));
        borrow.setReturnDate(new Date());
        return borrowRepository.save(borrow);
    }
}
