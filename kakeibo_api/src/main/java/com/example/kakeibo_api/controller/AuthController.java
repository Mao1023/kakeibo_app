package com.example.kakeibo_api.controller;

import com.example.kakeibo_api.model.User;
import com.example.kakeibo_api.model.dto.LogonRequest;
import com.example.kakeibo_api.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepository;

    AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/logon")
    public ResponseEntity<?> logon(@RequestBody LogonRequest request) {

        // 1. ユーザー名で検索
        Optional<User> userOptional = userRepository.findByUserName(request.getUsername());

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // 2. パスワード文字列の比較
            if (user.getUserPasswordHash() != null && user.getUserPasswordHash().equals(request.getPassword())) {

                // 3. 認証成功: userId を返却
                Map<String, Object> response = new HashMap<>();
                response.put("userId", user.getUserId());

                return ResponseEntity.ok(response);
            }
        }

        // ユーザー名不在、またはパスワード不一致
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ユーザー名かパスワードが間違っています。");
    }
}