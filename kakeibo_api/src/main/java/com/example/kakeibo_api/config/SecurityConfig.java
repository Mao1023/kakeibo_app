package com.example.kakeibo_api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 💡 API通信の邪魔になるCSRF保護をオフにする
                .csrf(csrf -> csrf.disable())

                // 💡 認証ルールの設定
                .authorizeHttpRequests(auth -> auth
                        // ログオン用APIへのアクセスは誰でも許可
                        .requestMatchers("/api/auth/**").permitAll()
                        // それ以外のURLは認証を必須にする
                        .anyRequest().authenticated())

                // 💡 401エラーの原因になっていた標準のログイン画面とポップアップを無効化
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable());

        return http.build();
    }
}