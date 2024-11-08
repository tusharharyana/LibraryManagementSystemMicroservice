package com.example.lms_springboot.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "author")
@NoArgsConstructor
@Data
public class Author {

    @Id
    private String id;
    private String name;
    private String biography;
    private String nationality;

}
