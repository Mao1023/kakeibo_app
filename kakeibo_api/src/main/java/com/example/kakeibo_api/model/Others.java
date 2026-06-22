package com.example.kakeibo_api.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "others_mst")
@Data
public class Others {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "others_id")
    private Integer othersId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "others_start_day", nullable = false)
    private Integer othersStartDay;

    @Column(name = "others_monthly_budget", nullable = false)
    private Integer othersMonthlyBudget;

    @Column(name = "others_carry_over", nullable = false)
    private Boolean othersCarryOver;

    @Column(name = "others_added_date", nullable = false, updatable = false)
    private LocalDateTime othersAddedDate;

    @PrePersist
    protected void onCreate() {
        this.othersAddedDate = LocalDateTime.now();
    }
}