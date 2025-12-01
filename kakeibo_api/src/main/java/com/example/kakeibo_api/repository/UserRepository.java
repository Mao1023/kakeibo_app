package com.example.kakeibo_api.repository;

import com.example.kakeibo_api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // ユーザー名でユーザーを検索するメソッドを定義します。
    Optional<User> findByName(String name);

    // ユーザー名とパスワードハッシュでユーザーを検索するメソッドを定義します。
    Optional<User> findByNameAndPasswordhash(String name, String passwordHash);
}