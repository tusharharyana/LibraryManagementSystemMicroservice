package com.example.lms_springboot.service;

import com.example.lms_springboot.model.Member;
import com.example.lms_springboot.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class MemberService {

    private static final Logger log = LoggerFactory.getLogger(MemberService.class);

    private final MemberRepository memberRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member createMember(Member member) {
        member.setMemberId(UUID.randomUUID().toString().split("-")[0]);
        log.info("Creating member: {}", member);
        return memberRepository.save(member);
    }

    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }


    public Optional<Member> getMemberById(String id) {
        return memberRepository.findById(id);
    }

    public Member updateMemberById(String id, Member member) {
        member.setMemberId(id);
        return memberRepository.save(member);
    }

    public void deleteMember(String id) {
        memberRepository.deleteById(id);
    }
}
