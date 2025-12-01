package com.example.kakeibo_api.repository;

import com.example.kakeibo_api.model.Shisyutsu;
import com.example.kakeibo_api.model.Item;
import com.example.kakeibo_api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ShisyutsuRepository extends JpaRepository<Shisyutsu, Long> {

        // ユーザーID、支出年月日、項目、支出名で各支出を検索するメソッドを定義します。
        Optional<Shisyutsu> findByUserAndDateAndItemAndName(User user, LocalDate date, Item item, String name);

        // ユーザー、支出年月日を指定して、1日の支出データを検索する
        List<Shisyutsu> findByUserAndDate(
                        User user,
                        LocalDate Date);

        // ユーザー、項目、支出年月日を指定して、項目に対する1日の支出データを検索する
        List<Shisyutsu> findByUserAndItemAndDate(
                        User user,
                        Item item,
                        LocalDate Date);

        // ユーザー、項目、支出年月日の範囲を指定して、複数の支出データを検索する
        // 1週間など、特定の期間のデータを検索する際に使用します。
        List<Shisyutsu> findByUserAndItemAndDateBetween(
                        User user,
                        Item item,
                        LocalDate startDate, // 検索開始年月
                        LocalDate endDate // 検索終了年月
        );

        // ユーザー、項目、支出年月の範囲を指定して、複数の支出データを検索する
        // 1ヶ月のデータを検索する際に使用します。
        List<Shisyutsu> findByUserAndItemAndYearMonth(
                        User user,
                        Item item,
                        Long yearMonth);

        // ユーザー、項目、支出年月の範囲を指定して、複数の支出データを検索する
        // 1ヶ月以上の特定の期間のデータを検索する際に使用します。
        List<Shisyutsu> findByUserAndItemAndYearMonthBetween(
                        User user,
                        Item item,
                        Long startYearMonth, // 検索開始年月
                        Long endYearMonth // 検索終了年月
        );
}