package com.example.kakeibo_api.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "shisyutsu_mst")
@Data
public class Shisyutsu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shisyutsu_id")
    private Integer shisyutsuId;

    @Column(name = "shisyutsu_date", nullable = false)
    private LocalDate shisyutsuDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @Column(name = "shisyutsu_name", nullable = false, length = 100)
    private String shisyutsuName;

    @Column(name = "shisyutsu_amount", nullable = false)
    private Integer shisyutsuAmount;

    @Column(name = "shisyutsu_added_date", nullable = false, updatable = false)
    private LocalDateTime shisyutsuAddedDate;

    @PrePersist
    protected void onCreate() {
        this.shisyutsuAddedDate = LocalDateTime.now();
    }
}