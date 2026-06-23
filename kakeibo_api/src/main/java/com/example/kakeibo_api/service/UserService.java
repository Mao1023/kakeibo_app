package com.example.kakeibo_api.service;

import com.example.kakeibo_api.model.User;
import com.example.kakeibo_api.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    // AuthControllerと同じく推奨されるコンストラクタ注入に統一
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * ユーザーIDからユーザー情報を取得
     */
    public Optional<User> findUserById(Integer id) { // 主キーの型をLongからIntegerに修正
        return userRepository.findById(id);
    }

    /**
     * ユーザー名からユーザー情報を取得
     */
    public Optional<User> findUserByName(String name) {
        // 修正：UserRepository側で作ったメソッド名「findByUserName」に合わせる
        return userRepository.findByUserName(name);
    }

    /**
     * 新規ユーザーを登録
     */
    public User registerNewUser(User user) {
        return userRepository.save(user);
    }
}