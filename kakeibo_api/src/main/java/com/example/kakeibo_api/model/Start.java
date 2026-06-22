package com.example.kakeibo_api.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "start_mst")
@Data
public class Start {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "start_id")
    private Integer startId;

    @Column(name = "start_year_month", nullable = false)
    private Integer startYearMonth;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "start_amount", nullable = false)
    private Integer startAmount;

    @Column(name = "start_added_date", nullable = false, updatable = false)
    private LocalDateTime startAddedDate;

    @PrePersist
    protected void onCreate() {
        this.startAddedDate = LocalDateTime.now();
    }
}