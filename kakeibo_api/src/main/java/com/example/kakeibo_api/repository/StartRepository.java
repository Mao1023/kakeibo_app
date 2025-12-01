package com.example.kakeibo_api.repository;

import com.example.kakeibo_api.model.Start;
import com.example.kakeibo_api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface StartRepository extends JpaRepository<Start, Long> {

    // 支払年月とユーザーIDで生活費を検索するメソッドを定義します。
    Optional<Start> findByYearmonthAndUser(Long yearMonth, User user);
}