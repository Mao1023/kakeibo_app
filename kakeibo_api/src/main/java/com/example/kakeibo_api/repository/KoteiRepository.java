package com.example.kakeibo_api.repository;

import com.example.kakeibo_api.model.Kotei;
import com.example.kakeibo_api.model.Item;
import com.example.kakeibo_api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface KoteiRepository extends JpaRepository<Kotei, Long> {

    // ユーザーIDで各固定費を検索するメソッドを定義します。
    List<Kotei> findByUser(User user);

    // ユーザーIDと項目IDで固定費データを検索する
    Optional<Kotei> findByUserAndItem(User user, Item item);
}