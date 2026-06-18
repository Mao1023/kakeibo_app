package com.example.kakeibo_api.repository;

import com.example.kakeibo_api.model.Shisyutsu;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ShisyutsuRepository extends JpaRepository<Shisyutsu, Integer> {
        Optional<Shisyutsu> findByShisyutsuName(String shisyutsuName);
}