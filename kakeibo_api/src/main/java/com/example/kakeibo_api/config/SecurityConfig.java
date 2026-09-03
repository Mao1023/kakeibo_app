package com.example.kakeibo_api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. CORSの設定を最優先で適用（Reactからのアクセスを許可）
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // 2. CSRF保護を無効化（API通信のため）
                .csrf(csrf -> csrf.disable())

                // 3. 認証ルールの設定
                .authorizeHttpRequests(auth -> auth
                        // ログオンや新規登録など、/api/auth/ 以下のURLは誰でもアクセス可能にする
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/setting/items/**").permitAll()
                        .anyRequest().authenticated())

                // 4. 標準のログイン画面やポップアップの無効化
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable());

        return http.build();
    }

    // React（ポート3000）からの通信を許可するための設定部
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000")); // ReactのURL
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}