package com.example.kakeibo_api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.kakeibo_api.model.dto.AccountItemRequest;
import com.example.kakeibo_api.model.Item;
import com.example.kakeibo_api.model.User;
import com.example.kakeibo_api.repository.ItemRepository;
import java.util.List;

@RestController
@RequestMapping("/api/setting/items")
public class AccountItemController {

    private final ItemRepository repository;

    // コンストラクタ注入
    public AccountItemController(ItemRepository repository) {
        this.repository = repository;
    }

    // 1. 全件取得 (GET) -> クエリパラメータの userId と一致する項目のみ
    @GetMapping
    public ResponseEntity<?> getAllItems(@RequestParam(required = false) Integer userId) {
        if (userId == null) {
            return ResponseEntity.badRequest().body("ユーザーIDが指定されていません。");
        }
        List<Item> items = repository.findByUser_UserId(userId);
        return ResponseEntity.ok(items);
    }

    // 2. 新規登録 (POST)
    @PostMapping
    public ResponseEntity<?> createItem(@RequestBody AccountItemRequest request,
            @RequestParam(required = false) Integer userId) {
        // 安全のため、URLパラメータまたはリクエストボディのいずれかからuserIdを確保
        Integer targetUserId = (userId != null) ? userId : request.getUserId();
        if (targetUserId == null) {
            return ResponseEntity.badRequest().body("ユーザーIDが指定されていません。");
        }

        Item newItem = new Item();
        newItem.setItemName(request.getName());
        newItem.setItemType(request.getCategory());
        newItem.setItemKoteiAmount(request.getCategory() == 2 ? request.getAmount() : null);

        // Userエンティティの関連付け
        User user = new User();
        user.setUserId(targetUserId);
        newItem.setUser(user);

        repository.save(newItem);
        return ResponseEntity.ok().build();
    }

    // 3. 編集の更新 (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateItem(@PathVariable Integer id, @RequestBody AccountItemRequest request) {
        return repository.findById(id).map(existingItem -> {
            existingItem.setItemName(request.getName());
            existingItem.setItemType(request.getCategory());
            existingItem.setItemKoteiAmount(request.getCategory() == 2 ? request.getAmount() : null);

            // ユーザー情報が欠落しないよう、既存のUserを再セットするかリクエストから補填
            if (existingItem.getUser() == null && request.getUserId() != null) {
                User user = new User();
                user.setUserId(request.getUserId());
                existingItem.setUser(user);
            }

            repository.save(existingItem);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }

    // 4. 項目の削除 (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Integer id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}