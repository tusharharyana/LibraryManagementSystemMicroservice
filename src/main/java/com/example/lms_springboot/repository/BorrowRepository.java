package com.example.lms_springboot.repository;

import com.example.lms_springboot.model.Borrow;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BorrowRepository extends MongoRepository<Borrow, String> {

}
