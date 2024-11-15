package com.example.lms_springboot.service;

import com.example.lms_springboot.model.Book;
import com.example.lms_springboot.model.Borrow;
import com.example.lms_springboot.repository.BookRepository;
import com.example.lms_springboot.repository.BorrowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
public class BorrowService {


    @Autowired
    private final BorrowRepository borrowRepository;
    @Autowired
    private BookRepository bookRepository;

    public BorrowService(BorrowRepository borrowRepository) {
        this.borrowRepository = borrowRepository;
    }


    public Borrow borrowBook(String memberId, String bookId) {

        Optional<Book> bookOptional = bookRepository.findById(bookId);

        if(bookOptional.isPresent()) {
            Book book = bookOptional.get();

            if(book.getBookQuantity() > 0){

                Borrow borrow = new Borrow();
                borrow.setMemberId(memberId);
                borrow.setBookId(bookId);
                borrow.setBorrowDate(new Date());

                //Set return after 30 days from current date.
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(new Date());
                calendar.add(Calendar.DAY_OF_MONTH, 30);
                Date dueDate = calendar.getTime();
                borrow.setDueDate(dueDate);

                Borrow savedBorrow = borrowRepository.save(borrow);
                book.setBookQuantity(book.getBookQuantity() - 1);
                bookRepository.save(book);

                return savedBorrow;
            }else{
                throw new IllegalMonitorStateException("Book is not available");
            }
        }else{
            throw new IllegalArgumentException("Book with ID "+ bookId +" not found");
        }


    }

    public List<Borrow> getAllBorrows() {
        return borrowRepository.findAll();
    }

    public Borrow getBorrowById(String id) {
        return borrowRepository.findById(id).orElseThrow(() -> new RuntimeException("Borrow record not found"));
    }


    public Borrow returnBook(String borrowId, boolean isLost) {

        Borrow borrow = borrowRepository.findById(borrowId).orElseThrow(() -> new RuntimeException("Borrow record not found"));
        Book book = bookRepository.findById(borrow.getBookId()).orElseThrow(() -> new RuntimeException("Book with ID " + borrowId + " not found"));

        double bookPrice = book.getBookPrice();
        double price = 0;

        if (isLost) {
            book.setBookQuantity(book.getBookQuantity() - 1);
            bookRepository.save(book);
            price = 30 + bookPrice + 15;
            borrow.setBorrowPrice(price);
            return borrowRepository.save(borrow);
        } else {
            price = calculatePrice(borrow, (float) bookPrice);
            borrow.setBorrowPrice(price);

            book.setBookQuantity(book.getBookQuantity() + 1);
            bookRepository.save(book);

            return borrowRepository.save(borrow);
        }
    }

    private double calculatePrice(Borrow borrow, float bookPrice) {
        Date borrowDate = borrow.getBorrowDate();
        Date dueDate = borrow.getDueDate();
        Date returnDate = new Date();

        long onTimeDays = getDateDifferenceInDays(borrowDate, dueDate);
        long returnDays = getDateDifferenceInDays(borrowDate, returnDate);

        double price = 0;


        if (returnDays <= onTimeDays) {
            price = returnDays * 1.0;
        } else {
            long overdueDays = returnDays - onTimeDays;
            price = (onTimeDays * 1.0) + (overdueDays * 1.5);
        }

        price += bookPrice;

        return price;
    }


    private long getDateDifferenceInDays(Date startDate, Date endDate) {
    long diffInMillies = Math.abs(endDate.getTime() - startDate.getTime());
    return TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MICROSECONDS);
    }
}
