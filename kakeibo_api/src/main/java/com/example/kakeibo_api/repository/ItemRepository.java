package com.example.kakeibo_api.repository;

import com.example.kakeibo_api.model.Item;
import com.example.kakeibo_api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    // ユーザーIDとマスタ種別で項目を検索するメソッドを定義します。
    List<Item> findByUserAndType(User user, Long type);
}