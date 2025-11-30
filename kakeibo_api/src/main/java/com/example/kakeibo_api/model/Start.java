package com.example.kakeibo_api.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

import lombok.Data;

@Entity
@Table(name = "start_mst")
@Data
public class Start {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long yearMonth;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private Long amount;
    private LocalDateTime addedDate;
}