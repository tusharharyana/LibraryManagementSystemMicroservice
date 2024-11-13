package com.example.lms_springboot.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "books")
@Data
@NoArgsConstructor
public class Book {

    @Id
    private String bookId;
    private String title;
    private String isbn;
    private List<String> authorIds;
    private String categoryId;
    private String publication_date;
    private String publisherId;
    private String locationId;
    private int copiesAvailable;

}
