package com.example.kakeibo_api.repository;

import com.example.kakeibo_api.model.Konetsu;
import com.example.kakeibo_api.model.Item;
import com.example.kakeibo_api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface KonetsuRepository extends JpaRepository<Konetsu, Long> {

    // ユーザーID、項目、支払い年月で各光熱費を検索するメソッドを定義します。
    Optional<Konetsu> findByUserAndYearMonthAndItem(User user, Long yearMonth, Item item);

    // ユーザー、項目、年月の範囲を指定して、複数の光熱費データを検索する
    // 1年分など、特定の期間のデータを検索する際に使用します。
    List<Konetsu> findByUserAndItemAndYearMonthBetween(
            User user,
            Item item,
            Long startYearMonth, // 検索開始年月
            Long endYearMonth // 検索終了年月
    );
}