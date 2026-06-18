package com.example.kakeibo_api.repository;

import com.example.kakeibo_api.model.Start;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface StartRepository extends JpaRepository<Start, Integer> {
    Optional<Start> findByStartYearMonth(Integer startYearMonth);
}