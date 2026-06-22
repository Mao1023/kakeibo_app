package com.example.kakeibo_api.repository;

import com.example.kakeibo_api.model.Others;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface OthersRepository extends JpaRepository<Others, Integer> {
    Optional<Others> findByOthersStartDay(Integer othersStartDay);
}