package com.example.kakeibo_api.service;

import com.example.kakeibo_api.model.User;
import com.example.kakeibo_api.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Optional;

@Service
public class UserService {

    // UserRepositoryを注入
    @Autowired
    private UserRepository userRepository;

    // パスワードのハッシュ化ツール（PasswordEncoderなど）を注入する場所
    // @Autowired
    // private PasswordEncoder passwordEncoder;

    /**
     * ユーザーIDからユーザー情報を取得します。
     * 
     * @param id ユーザーID
     * @return ユーザーオブジェクト（存在しない場合はOptional.empty()）
     */
    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * ユーザー名からユーザー情報を取得します。（主に認証処理に使用）
     * 
     * @param name ユーザー名
     * @return ユーザーオブジェクト（存在しない場合はOptional.empty()）
     */
    public Optional<User> findUserByName(String name) {
        return userRepository.findByName(name);
    }

    /**
     * 新規ユーザーを登録します。
     * 
     * @param user 登録するユーザー情報（未ハッシュ化パスワードを含む）
     * @return 登録されたユーザーオブジェクト
     */
    public User registerNewUser(User user) {
        // 【TODO: 新規登録ロジックの追加】
        // 1. ユーザー名の重複チェック
        // 2. user.getPassword()を取得し、passwordEncoderでハッシュ化
        // 3. user.setPassword(ハッシュ化されたパスワード) でセット
        // 4. userRepository.save(user) で保存

        return userRepository.save(user); // 仮の保存処理
    }

    // 【TODO: ログイン/ログアウト処理】
    // ログイン処理（ご自身で調査・実装する部分）のメソッドをここに追加
}