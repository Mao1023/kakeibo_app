package com.example.kakeibo_api.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "item_mst")
@Data
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "item_id")
    private Integer itemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "item_name", nullable = false, length = 50)
    private String itemName;

    @Column(name = "item_type", nullable = false)
    private Integer itemType;

    @Column(name = "item_kotei_amount")
    private Integer itemKoteiAmount;

    @Column(name = "item_added_date", nullable = false, updatable = false)
    private LocalDateTime itemAddedDate;

    @PrePersist
    protected void onCreate() {
        this.itemAddedDate = LocalDateTime.now();
    }
}