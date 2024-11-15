package com.example.lms_springboot.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document(collection = "members")
public class Member {

    @Id
    private String memberId;
    private String memberName;
    private String memberEmail;
}
