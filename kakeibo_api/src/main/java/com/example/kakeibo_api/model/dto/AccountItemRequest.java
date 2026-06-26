package com.example.kakeibo_api.model.dto;

public class AccountItemRequest {
    private String name;
    private Integer category; // 1: 支出, 2: 固定費
    private Integer amount; // 固定費の金額
    private Integer userId; // ユーザーID

    // ゲッター・セッター
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCategory() {
        return category;
    }

    public void setCategory(Integer category) {
        this.category = category;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}