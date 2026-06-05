# その他設定マスタ

| カラム               | 型          | 詳細                   |
| ----------------- | ---------- | -------------------- |
| others_id           | int        | ID。必須。主キー。重複不可。自動連番。 |
| user_id            | int     | ユーザーID。必須。外部キー(user_mstのuser_id)。 |
| others_start_day  | int | 月の開始日。必須。デフォルトは1。    |
| others_monthly_budget|int |月の開始額。必須。  |
| others_carry_over |boolean     |先月分の繰越設定。必須。ON(true)/OFF(false)。  |
| others_added_date   |timestamp   |登録年月日。必須。データ登録時、自動入力。 |
