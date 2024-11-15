package com.example.lms_springboot.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@NoArgsConstructor
@Document(collection = "borrow")
public class Borrow {

    @Id
    private String borrowId;
    private String memberId;
    private String bookId;
    private Date borrowDate;
    private Date dueDate;
    private Double borrowPrice = 0.0;

}
