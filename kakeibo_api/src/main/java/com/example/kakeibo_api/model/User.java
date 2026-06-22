package com.example.kakeibo_api.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_mst")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "user_name", nullable = false, length = 50)
    private String userName;

    @Column(name = "user_password_hash", nullable = false, length = 255)
    private String userPasswordHash;

    @Column(name = "user_admin", nullable = false)
    private Boolean userAdmin = false;

    @Column(name = "user_added_date", nullable = false, updatable = false)
    private LocalDateTime userAddedDate;

    @PrePersist
    protected void onCreate() {
        this.userAddedDate = LocalDateTime.now();
    }

}