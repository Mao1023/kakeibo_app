package com.example.kakeibo_api.repository;

import com.example.kakeibo_api.model.Item;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Integer> {
    Optional<Item> findByItemName(String itemName);

    List<Item> findByUser_UserId(Integer userId);
}