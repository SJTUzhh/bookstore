package com.reins.bookstore.entity;

import com.reins.bookstore.repository.TestEntityRepository;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.Assert.*;

@SpringBootTest
public class TestEntityTest {
    @Autowired
    private TestEntityRepository testEntityRepository;

    @Test
    public void checkIdAutoIncrement() {
        //if(testEntityRepository == null) return;
        TestEntity tmp = new TestEntity("x");
        System.out.println("tmp の ID: " + tmp.getId());
        testEntityRepository.saveAndFlush(new TestEntity("x"));
        testEntityRepository.saveAndFlush(new TestEntity("y"));
        testEntityRepository.saveAndFlush(new TestEntity("z"));
        List<TestEntity> testEntities = testEntityRepository.findAll();
        for (TestEntity testEntitie: testEntities) {
            if(testEntitie != null) {
                System.out.println(testEntitie.getId());
            }
        }
    }
}